import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3'
import { NextRequest, NextResponse } from 'next/server'

interface S3File {
  key: string
  name: string
  size: number
  lastModified: Date | undefined
  url: string
}

interface ListFilesOptions {
  prefix?: string
  maxKeys?: number
}

const getListFilesFromS3 = async (options: ListFilesOptions = {}): Promise<S3File[]> => {
  try {
    const s3Client = new S3Client({
      region: process.env.NEXT_AWS_S3_REGION as string,
      credentials: {
        accessKeyId: process.env.NEXT_AWS_S3_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.NEXT_AWS_S3_SECRET_ACCESS_KEY as string,
      },
    })

    const params = {
      Bucket: process.env.NEXT_AWS_S3_BUCKET_NAME!,
      MaxKeys: options.maxKeys ?? 100,
      ...(options.prefix && { Prefix: options.prefix })
    }

    const command = new ListObjectsV2Command(params)
    const data = await s3Client.send(command)

    // development logging
    if (process.env.NODE_ENV === 'development') {
      console.log('S3 List Objects Response:', {
        KeyCount: data.KeyCount,
        IsTruncated: data.IsTruncated,

      })
    }

    if (!data.Contents || data.Contents.length === 0) {
      return []
    }

    // filter and map the files
    const files = data.Contents
      .filter(file => file.Key && !file.Key.endsWith('/'))
      .map(file => ({
        key: file.Key!,
        name: file.Key!.split('/').pop() ?? 'Unknown',
        size: file.Size ?? 0,
        lastModified: file.LastModified,
        url: `https://${process.env.NEXT_AWS_S3_BUCKET_NAME}.s3.${process.env.NEXT_AWS_S3_REGION}.amazonaws.com/${encodeURIComponent(file.Key!)}`
      }))

    // sort files by last modified date, newest first
    return files.sort((a, b) => {
      if (!a.lastModified || !b.lastModified) return 0
      return new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime()
    })

  } catch (error) {
    console.error('Error in getListFilesFromS3:', error)
    throw new Error(error instanceof Error ? error.message : 'Failed to list files from S3')
  }
}

export async function GET(req: NextRequest) {
  try {
    // get params from URL
    const { searchParams } = new URL(req.url)
    const prefix = searchParams.get('prefix') ?? ''
    const maxKeys = parseInt(searchParams.get('maxKeys') ?? '25')

    // valid maxKeys
    if (maxKeys < 1 || maxKeys > 100) {
      return NextResponse.json(
        { error: 'maxKeys must be between 1 and 100' },
        { status: 400 }
      )
    }

    const files = await getListFilesFromS3({ prefix, maxKeys })

    return NextResponse.json({
      files,
      count: files.length,
      prefix,
      ...(files.length === maxKeys && {
        warning: 'Results may be truncated. Consider using pagination.'
      })
    })

  } catch (error) {
    console.error('Error in GET handler:', error)
    if (error instanceof Error) {
      if (error.message.includes('NoSuchBucket')) {
        return NextResponse.json(
          { error: 'S3 bucket not found' },
          { status: 404 }
        )
      }

      if (error.message.includes('AccessDenied')) {
        return NextResponse.json(
          { error: 'Access denied to S3 bucket' },
          { status: 403 }
        )
      }
    }

    return NextResponse.json(
      { error: 'Failed to list files', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}