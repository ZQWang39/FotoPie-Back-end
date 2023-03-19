import { Injectable } from "@nestjs/common";
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

@Injectable()
export class DownloadService {
  async generatePresignedUrl(filename: string) {
    //create a new S3Client
    const s3Client = new S3Client({
      region: process.env.BUCKET_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET,
      },
    });
    const bucketParams = {
      Bucket: process.env.AWS_BUCKET_NAME_PHOTO,
      Key: filename,
      Body: "BODY",
    };
    // Create a presigned URL
    try {
      const command = new GetObjectCommand(bucketParams);
      const signedUrl = await getSignedUrl(s3Client, command, {
        expiresIn: 900,
      });
      return signedUrl;
    } catch (err) {
      return err.message;
    }
  }
}
