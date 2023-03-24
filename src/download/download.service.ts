import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  Res,
  NotAcceptableException,
  HttpException,
  ForbiddenException,
} from "@nestjs/common";
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Subscription } from "../subscription/schemas/subscription.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
// import { DownloadDto } from "./dto/download.dto";

@Injectable()
export class DownloadService {
  constructor(
    @InjectModel(Subscription.name)
    private readonly subscriptionModel: Model<Subscription>
  ) {}

  async generatePresignedUrl(filename: string, userEmail: string) {
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
      // console.log(err.message);
      // return {
      //   message: "Not subscribed",
      // };
      // throw new UnauthorizedException("No subscription found");
      throw new ForbiddenException("No subscription found");
    }
  }

  //check if the user subscribed
  async findSubscriptionByEmail(email: string): Promise<Subscription> {
    const subscription = await this.subscriptionModel.findOne({
      customer_email: email,
    });
    if (!subscription) throw new NotFoundException();
    return subscription;
  }

  //check if the user subscription is within one month
  async isWithinOneMonth(updatedAt: Date): Promise<boolean> {
    const currentTime = new Date();
    const oneMonthAgo = new Date(currentTime);
    oneMonthAgo.setMonth(currentTime.getMonth() - 1);
    return updatedAt >= oneMonthAgo;
  }
}
