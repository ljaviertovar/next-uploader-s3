import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";

const CONFIG = {
  BUCKET_NAME: process.env.NEXT_AWS_S3_BUCKET_NAME!,
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_TYPES: ['application/pdf'],
  PREFIX: 'pdfs/',
} as const

interface UploadResult {
  key: string
  fileName: string
  size: number
  url: string
  uploadedAt: string
}

interface UploadError {
  error: string
  details?: string
}

const validateFile = (file: File): string | null => {
  console.log({ file })
  if (!CONFIG.ALLOWED_TYPES.includes(file.type as any)) {
    return `Invalid file type. Only ${CONFIG.ALLOWED_TYPES.join(', ')} files are allowed.`
  }

  if (file.size > CONFIG.MAX_FILE_SIZE) {
    return `File size exceeds limit. Maximum size is ${CONFIG.MAX_FILE_SIZE / (1024 * 1024)}MB.`
  }

  if (!file.name || file.name.trim().length === 0) {
    return 'File name is required.'
  }

  if (!file.name.toLowerCase().endsWith('.pdf')) {
    return 'File must have a .pdf extension.'
  }

  return null
}

const generateUniqueFileName = (originalName: string): string => {
  const timestamp = Date.now()
  const randomString = Math.random().toString(36).substring(2, 8)
  const extension = originalName.split('.').pop()
  const baseName = originalName.replace(/\.[^/.]+$/, "").replace(/[^a-zA-Z0-9]/g, '_')

  return `${CONFIG.PREFIX}${timestamp}-${randomString}-${baseName}.${extension}`
}

const uploadFileToS3 = async (file: File): Promise<UploadResult> => {
  const s3Client = new S3Client({
    region: process.env.NEXT_AWS_S3_REGION as string,
    credentials: {
      accessKeyId: process.env.NEXT_AWS_S3_ACCESS_KEY_ID as string,
      secretAccessKey: process.env.NEXT_AWS_S3_SECRET_ACCESS_KEY as string,
    },
  })

  const buffer = Buffer.from(await file.arrayBuffer())
  const uniqueFileName = generateUniqueFileName(file.name)

  const params = {
    Bucket: CONFIG.BUCKET_NAME,
    Key: uniqueFileName,
    Body: buffer,
    ContentType: file.type,
    ContentLength: file.size,
    Metadata: {
      'original-name': file.name,
      'upload-timestamp': new Date().toISOString(),
      'file-size': file.size.toString(),
    },
    // ACL para acceso público (opcional)
    // ACL: 'public-read',
  }

  const command = new PutObjectCommand(params)
  const result = await s3Client.send(command)

  // development logging
  if (process.env.NODE_ENV === 'development') {
    console.log('File uploaded successfully:', {
      key: uniqueFileName,
      etag: result.ETag,
      size: file.size
    })
  }

  return {
    key: uniqueFileName,
    fileName: file.name,
    size: file.size,
    url: `https://${CONFIG.BUCKET_NAME}.s3.${process.env.NEXT_AWS_S3_REGION}.amazonaws.com/${encodeURIComponent(uniqueFileName)}`,
    uploadedAt: new Date().toISOString()
  }
}

export async function POST(req: NextRequest) {
  try {
    let formData: FormData
    try {
      formData = await req.formData()
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid form data', details: error instanceof Error ? error.message : 'Unknown error' } as UploadError,
        { status: 400 }
      )
    }

    const file = formData.get("file") as File | null
    if (!file) {
      return NextResponse.json(
        { error: 'File is required in form data with key "file"' } as UploadError,
        { status: 400 }
      )
    }

    const validationError = validateFile(file)
    if (validationError) {
      return NextResponse.json(
        { error: validationError } as UploadError,
        { status: 400 }
      )
    }

    const uploadResult = await uploadFileToS3(file)

    return NextResponse.json(uploadResult, {
      status: 201
    })

  } catch (error) {
    console.error('Upload route error:', error)

    // Handle specific S3 errors
    if (error instanceof Error) {

      if (error.message.includes('NoSuchBucket')) {
        return NextResponse.json(
          { error: 'S3 bucket not found' } as UploadError,
          { status: 404 }
        )
      }

      if (error.message.includes('AccessDenied')) {
        return NextResponse.json(
          { error: 'Access denied to S3 bucket' } as UploadError,
          { status: 403 }
        )
      }

      if (error.message.includes('EntityTooLarge')) {
        return NextResponse.json(
          { error: 'File too large for upload' } as UploadError,
          { status: 413 }
        )
      }
    }

    return NextResponse.json(
      { error: 'Failed to upload file', details: error instanceof Error ? error.message : 'Unknown error' } as UploadError,
      { status: 500 }
    )
  }
}