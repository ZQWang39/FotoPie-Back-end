import { Injectable, NotFoundException } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Posts } from "./schema/post.schema";
import { User } from "../user/schemas/user.schema";
import { Collect } from "./schema/collect.schema";
import { Like } from "./schema/like.schema";

@Injectable()
export class QuickViewService {
  constructor(
    @InjectModel("Posts") private readonly postsModel: Model<Posts>,
    @InjectModel("User") private readonly userModel: Model<User>,
    @InjectModel("Like") private readonly likeModel: Model<Like>,
    @InjectModel("Collect") private readonly collectModel: Model<Collect>
  ) {}

  async getUsername(filename: string): Promise<string> {
    const post = await this.findPostByFilename(filename);
    const user = await this.findUserByEmail(post.userEmail);
    const user_name = user.firstName + " " + user.lastName;
    return user_name;
  }

  async getAvatar(filename: string): Promise<string> {
    const post = await this.findPostByFilename(filename);
    const user = await this.findUserByEmail(post.userEmail);

    const avatar = user.avatar;
    return avatar;
  }

  async getLikes(filename: string): Promise<number> {
    const likes = await this.likeModel.count({ filename });
    return likes;
  }

  async getCollects(filename: string): Promise<number> {
    const collects = await this.collectModel.count({ filename });
    return collects;
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
