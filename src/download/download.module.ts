import { Module } from "@nestjs/common";
import { DownloadController } from "./download.controller";
import { DownloadService } from "./download.service";
import {
  Subscription,
  SubscriptionSchema,
} from "../subscription/schemas/subscription.schema";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Subscription.name, schema: SubscriptionSchema },
    ]),
  ],

  controllers: [DownloadController],
  providers: [DownloadService],
  exports: [DownloadService],
})
export class DownloadModule {}
