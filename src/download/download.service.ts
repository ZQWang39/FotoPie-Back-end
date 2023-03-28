import { ConfigService } from "@nestjs/config";
import { Injectable, NotFoundException } from "@nestjs/common";
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Subscription } from "../subscription/schemas/subscription.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class DownloadService {
  constructor(
    @InjectModel(Subscription.name)
    private readonly subscriptionModel: Model<Subscription>,
    private ConfigService: ConfigService
  ) {}

  async generatePresignedUrl(filename: string, userEmail: string) {
    //create a new S3Client
    const s3Client = new S3Client({
      region: "ap-southeast-2",
      credentials: {
        accessKeyId: this.ConfigService.get("aws_access_key_id"),
        secretAccessKey: this.ConfigService.get("aws_access_key_secret"),
      },
    });
    const bucketParams = {
      Bucket: "fotopie-photo",
      Key: filename,
      Body: "BODY",
    };
    // Create a presigned URL
    try {
      const subscription = await this.findSubscriptionByEmail(userEmail);
      const updatedAt = subscription.updatedAt;
      const isValid = this.isWithinOneMonth(updatedAt);
      if (subscription && isValid) {
        const command = new GetObjectCommand(bucketParams);
        const signedUrl = await getSignedUrl(s3Client, command, {
          expiresIn: 900,
        });
        return signedUrl;
      }
    } catch (err) {
      if (err instanceof NotFoundException) {
        console.error("generatePresignedUrl", err);
      }
      console.error("unexpected error", err);
      throw err;
    }
  }

  //check if the user subscribed
  async findSubscriptionByEmail(email: string): Promise<Subscription> {
    const subscription = await this.subscriptionModel.findOne({
      customer_email: email,
    });
    if (!subscription) throw new NotFoundException("no subscription found");
    return subscription;
  }

  //check if the user subscription is within one month
  isWithinOneMonth(updatedAt: Date): boolean {
    const currentTime = new Date();
    const oneMonthAgo = new Date(currentTime);
    oneMonthAgo.setMonth(currentTime.getMonth() - 1);
    return updatedAt >= oneMonthAgo;
  }
}
