import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
//import { User, UserSchema } from "../user/schemas/user.schema";
import { Posts, PostSchema } from "../posts/schema/post.schema";
import { Category } from "./category.controller";
import { CategoryService } from "./category.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Posts.name, schema: PostSchema }]),

    //MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [CategoryService],
  controllers: [Category],
})
export class CategoryModule {}
