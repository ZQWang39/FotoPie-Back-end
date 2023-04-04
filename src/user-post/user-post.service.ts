import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Posts } from "../posts/schema/post.schema";
import { User } from "src/user/schemas/user.schema";
import { Collect } from "src/collect/schemas/collect.schema";
import { Like } from "src/like/schemas/like.schema";

@Injectable()
export class UserPostService {
  constructor(
    @InjectModel(Posts.name) private postModel: Model<Posts>,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Collect.name) private collectModel: Model<Collect>,
    @InjectModel(Like.name) private likeModel: Model<Like>
  ) {}

  async getUserEmailById(_id: string): Promise<string> {
    const user = await this.userModel.findOne({ _id }).exec();
    if (!user) {
      throw new NotFoundException();
    }
    return user.email;
  }
  async getPostsByUserEmail(userEmail: string): Promise<Posts[]> {
    return this.postModel.find({ userEmail }).sort({ createdAt: "desc" });
  }

  async deletePostByFilename(filename: string): Promise<void> {
    await this.postModel.deleteOne({ filename }).exec();
    await this.collectModel.deleteOne({ filename }).exec();
    await this.likeModel.deleteOne({ filename }).exec();
  }
}
