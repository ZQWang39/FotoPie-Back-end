import { Injectable, NotFoundException } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Posts } from "./schema/post.schema";
import { User } from "../user/schemas/user.schema";

@Injectable()
export class QuickViewService {
  constructor(
    @InjectModel("Posts") private readonly postsModel: Model<Posts>,
    @InjectModel("User") private readonly userModel: Model<User>
  ) {}

  async getUsername(filename: string): Promise<object> {
    const post = await this.findPostByFilename(filename);
    const user = await this.findUserByEmail(post.user);

    const user_name = user.firstName + " " + user.lastName;

    return { user_name };
  }

  async getAvatar(filename: string): Promise<string> {
    const post = await this.findPostByFilename(filename);
    const user = await this.findUserByEmail(post.user);

    console.log(post);
    console.log(user);
    const avatar = user.avatar;
    console.log(user.firstName);
    console.log(user.lastName);
    console.log(user.email);
    console.log(user.role);

    console.log(user.avatar);

    return avatar;
  }

  async findPostByFilename(filename: string): Promise<Posts> {
    const post = await this.postsModel.findOne({ filename });
    if (!post) throw new NotFoundException();
    return post;
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email });
    if (!user) throw new NotFoundException();
    return user;
  }
}
