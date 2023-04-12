import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from "src/user/user.module";
import { Quality, QualitySchema } from "./schema/image-quality.schema";
import { Posts, PostSchema } from "../posts/schema/post.schema";
import { QualityController } from "./image-quality.controller";
import { QualityService } from "./image-quality.service";

@Module({
  imports: [
    //MongooseModule.forFeature([{ name: Posts.name, schema: PostSchema }]),
    MongooseModule.forFeature([{ name: Quality.name, schema: QualitySchema }]),
    UserModule,
  ],
  controllers: [QualityController],
  providers: [QualityService],
  exports: [QualityService],
})
export class QualityModule {}
