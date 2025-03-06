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
    console.log("formData", formData);
    console.log("file", file);

    if (!file) {
      return new Response(null,
        {
          status: 400,
          statusText: "File is required.",
        }
      )
    }

    const uploadedFile = await uploadFileToS3(file);

    return new Response(JSON.stringify({
      fileName: uploadedFile,
    }), {
      status: 200,
      statusText: "File uploaded successfully."
    })

  } catch (error) {
    return new Response(null,
      {
        status: 500,
        statusText: "Failed to upload file.",
      }
    )
  }
}