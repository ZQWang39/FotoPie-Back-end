import { Module } from "@nestjs/common";
import { NotificationService } from "./notification.service";
import { NotificationController } from "./notification.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from "src/user/user.module";
import { Like, LikeSchema } from '../like/schemas/like.schema'
import { LikeModule } from "src/like/like.module";
import { Posts, PostSchema } from '../like/schemas/post.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Like.name, schema: LikeSchema  }]),
    MongooseModule.forFeature([{ name: Posts.name, schema: PostSchema }]),
    UserModule,
    LikeModule,
  ],
  controllers: [NotificationController],
  providers: [NotificationService],

})

export class NotificationModule {}