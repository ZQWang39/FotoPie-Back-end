import { Injectable, Param, NotFoundException } from "@nestjs/common";
import mongoose, { Model, ObjectId } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Post, PostSchema } from "./schema/post.schema";
import { User, UserSchema } from "../user/schemas/user.schema";

@Injectable()
export class QuickViewService {
  constructor(
    @InjectModel("Post") private readonly postModel: Model<Post>,
    @InjectModel("User") private readonly userModel: Model<User>
  ) {}

  async getData(post_id: string): Promise<any> {
    const post = await this.findPostById(post_id);
    const user = await this.findUserById(post.user_id);

    const user_name = user.name;
    const user_image = user.image;
    const photo = post.photo;
    return { user_name, user_image, photo };
  }

  async findPostById(id: string): Promise<Post> {
    const post = await this.postModel.findOne({ id });
    if (!post) throw new NotFoundException();
    return post;
  }

  async findUserById(id: string): Promise<User> {
    const user = await this.userModel.findOne({ id });
    if (!user) throw new NotFoundException();
    return user;
  }
}
