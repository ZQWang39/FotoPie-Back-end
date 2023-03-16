import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Posts } from "./schema/post.schema";
import { User } from "src/user/schemas/user.schema";

@Injectable()
export class UserPostService {
  constructor(
    @InjectModel(Posts.name) private postModel: Model<Posts>,
    @InjectModel(User.name) private userModel: Model<User>
  ) {}

  async getUserEmailById(_id: string): Promise<string> {
    const user = await this.userModel.findOne({ _id }).exec();
    if (!user) {
      throw new NotFoundException();
    }
    return user.email;
  }
  async getPostsByUserEmail(userEmail: string): Promise<Posts[]> {
    return this.postModel.find({ userEmail });
  }

  async deletePostByFilename(filename: string): Promise<boolean> {
    try {
      const post = await this.postModel.findOne({ filename });
      if (!post) {
        throw new Error("Post not found");
      }
      await post.deleteOne();
      return true;
    } catch (error) {
      throw new Error(`Error deleting post: ${error}`);
    }
  }
}
