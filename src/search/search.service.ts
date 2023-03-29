import { Injectable } from '@nestjs/common';
import { Posts } from "../posts/schema/post.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Query } from "express-serve-static-core";

@Injectable()
export class SearchService {
    constructor(
        @InjectModel(Posts.name) private readonly postsModel: Model<Posts>,
    ) {}
    async getSearchPostsIdByTag(
        tag: string,
        query: Query
      ): Promise<Posts[]> {
        const resPerPage = Number(query.limit);
        const currentPage = Number(query.page) || 1;
        const skip = resPerPage * (currentPage - 1);
        return this.postsModel
          .find({ tag })
          .limit(resPerPage)
          .skip(skip);
      }



}
