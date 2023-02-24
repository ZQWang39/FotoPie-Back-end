import { Injectable, NotFoundException } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Posts } from "./schema/post.schema";
import { User } from "../user/schemas/user.schema";

@Injectable()
export class QuickViewService {
  constructor(
    @InjectModel("Post") private readonly postModel: Model<Posts>,
    @InjectModel("User") private readonly userModel: Model<User>
  ) {}

  async getUsername(filename: string): Promise<object> {
    const post = await this.findPostByFilename(filename);
    const user = await this.findUserByEmail(post.email);

    const user_name = user.firstName + " " + user.lastName;

    return { user_name };
  }

  async getAvatar(filename: string): Promise<string> {
    const post = await this.findPostByFilename(filename);
    const user = await this.findUserByEmail(post.email);

    const avatar = user.avatar;

    return avatar;
  }

  async findPostByFilename(filename: string): Promise<Posts> {
    const post = await this.postModel.findOne({ filename });
    if (!post) throw new NotFoundException();
    return post;
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email });
    if (!user) throw new NotFoundException();
    return user;
  }
}
