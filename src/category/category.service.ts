import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Posts } from "./schema/post.schema";
//import { User } from "src/user/schemas/user.schema";
import { Query } from "express-serve-static-core";

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Posts.name) private postModel: Model<Posts>,
    //@InjectModel(User.name) private userModel: Model<User>
  ) {}

  async getCategoryPostsIdByTag(
    tag: string,
    query: Query
  ): Promise<Posts[]> {
    const resPerPage = Number(query.limit);
    const currentPage = Number(query.page) || 1;
    const skip = resPerPage * (currentPage - 1);
    const result = this.postModel
      .find({ tag })
      .limit(resPerPage)
      .skip(skip);
    if (!result) {
      throw new NotFoundException("User collection posts not found");
    }
    return result;
  }
}
