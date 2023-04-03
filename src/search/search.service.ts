import { Injectable } from '@nestjs/common';
import { Posts } from "../posts/schema/post.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Query } from "express-serve-static-core";

@Injectable()
export class SearchService {
  constructor(
    @InjectModel(Posts.name) private readonly postsModel: Model<Posts>
  ) {}
  async getSearchPostsIdByTag(tag: string, query: Query): Promise<Posts[]> {
    const resPerPage = Number(query.limit);
    const currentPage = Number(query.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    //const regex = new RegExp(tag, "i");

    return this.postsModel
      .find(
        { $text: { $search: tag }, tags: { $in: tag.split(" ") } },
        { score: { $meta: "textScore" } }
      )
      //.find({tag})
      .sort({ createdAt: "desc" })
      .limit(resPerPage)
      .sort({ score: { $meta: "textScore" } })
      .skip(skip);
  }
}
