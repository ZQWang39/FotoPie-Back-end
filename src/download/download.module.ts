import { Module } from "@nestjs/common";
// import { MongooseModule } from "@nestjs/mongoose";
// import { Posts, PostSchema } from "./schema/post.schema";
import { DownloadController } from "./download.controller";
import { DownloadService } from "./download.service";

@Module({
  // imports: [
  //   MongooseModule.forFeature([{ name: Posts.name, schema: PostSchema }]),
  // ],
  controllers: [DownloadController],
  providers: [DownloadService],
  exports: [DownloadService],
})
export class DownloadModule {}
