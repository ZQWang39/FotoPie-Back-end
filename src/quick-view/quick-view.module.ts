import { Module } from "@nestjs/common";
import { QuickViewService } from "./quick-view.service";
import { QuickViewController } from "./quick-view.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "../user/schemas/user.schema";
import { Posts, PostSchema } from "../posts/schema/post.schema";
import { Like, LikeSchema } from "../like/schemas/like.schema";
import { Collect, CollectSchema } from "../collect/schemas/collect.schema";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Posts.name, schema: PostSchema }]),
    MongooseModule.forFeature([{ name: Like.name, schema: LikeSchema }]),
    MongooseModule.forFeature([{ name: Collect.name, schema: CollectSchema }]),
    JwtModule.register({
      secret: process.env.JWT_ACTIVATE_SECRET_KEY,
      signOptions: { expiresIn: "15m" },
    }),
  ],
  controllers: [QuickViewController],
  providers: [QuickViewService],
  exports: [QuickViewService],
})
export class QuickViewModule {}
