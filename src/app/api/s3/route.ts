import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";

const s3Client = new S3Client({
  region: process.env.NEXT_AWS_S3_REGION as string,
  credentials: {
    accessKeyId: process.env.NEXT_AWS_S3_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.NEXT_AWS_S3_SECRET_ACCESS_KEY as string,
  },
});

const bucketName = process.env.NEXT_AWS_S3_BUCKET_NAME as string;

const uploadFileToS3 = async (file: File) => {
  const buffer = Buffer.from(await file.arrayBuffer());
  const fileName = file.name;

  const params = {
    Bucket: bucketName,
    Key: fileName,
    Body: buffer,
    contentType: "application/pdf",
  };

  const command = new PutObjectCommand(params);
  await s3Client.send(command);

  return fileName;
}

export async function POST(req: NextRequest) {
  try {

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        {
          success: false,
          status: 400,
          body: {
            message: "File is required",
          },
        }
      )
    }

    const uploadedFile = await uploadFileToS3(file);

    return {
      status: 200,
      success: true,
      body: {
        message: "File uploaded successfully",
        data: {
          fileName: uploadedFile,
        },
      },
    };
  } catch (error) {
    return {
      status: 500,
      success: false,
      body: {
        message: "Failed to upload file",
        error,
      },
    };
  }

}