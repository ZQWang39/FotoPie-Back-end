import { Module } from "@nestjs/common";
import { QuickViewService } from "./quickView.service";
import { QuickViewController } from "./quickView.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "../user/schemas/user.schema";
import { Posts, PostsSchema } from "./schema/post.schema";
import { Like, LikeSchema } from "./schema/like.schema";
import { Collect, CollectSchema } from "./schema/collect.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Posts.name, schema: PostsSchema }]),
    MongooseModule.forFeature([{ name: Like.name, schema: LikeSchema }]),
    MongooseModule.forFeature([{ name: Collect.name, schema: CollectSchema }]),
  ],
  controllers: [QuickViewController],
  providers: [QuickViewService],
  exports: [QuickViewService],
})
export class QuickViewModule {}
