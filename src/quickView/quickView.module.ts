import { Module } from "@nestjs/common";
import { QuickViewService } from "./quickView.service";
import { QuickViewController } from "./quickView.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "../user/schemas/user.schema";
import { Posts, PostsSchema } from "./schema/post.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Posts.name, schema: PostsSchema }]),
  ],
  controllers: [QuickViewController],
  providers: [QuickViewService],
})
export class QuickViewModule {}
