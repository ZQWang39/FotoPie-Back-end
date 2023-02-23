import { Injectable, Param, NotFoundException } from "@nestjs/common";
import mongoose, { Model, ObjectId } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Posts, PostSchema } from "./schema/post.schema";
import { User, UserSchema } from "../user/schemas/user.schema";

@Injectable()
export class QuickViewService {
  constructor(
    @InjectModel("Post") private readonly postModel: Model<Posts>,
    @InjectModel("User") private readonly userModel: Model<User>
  ) {}

  async getPostInfo(uuid: string): Promise<any> {
    const post = await this.findPostById(uuid);
    const user = await this.findUserById(post.user);

    const user_name = user.firstName + "" + user.lastName;
    const user_image = user.image;
    const photo = post.image;
    return { user_name, user_image, photo };
  }

  async findPostById(_id: ObjectId): Promise<Posts> {
    const post = await this.postModel.findOne({ _id });
    if (!post) throw new NotFoundException();
    return post;
  }

  async findUserById(_id: ObjectId): Promise<User> {
    const user = await this.userModel.findOne({ _id });
    if (!user) throw new NotFoundException();
    return user;
  }
}
