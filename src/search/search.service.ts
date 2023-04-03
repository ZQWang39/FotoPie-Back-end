import { Injectable, NotFoundException } from '@nestjs/common';
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

    const terms = tag.trim().split(/\s+/);
    const regex = new RegExp(terms.join("|"), "i");

    // const result = this.postsModel
    //   .find({
    //     $or: [
    //       { $text: { $search: tag } },
    //       { tags: { $in: tag.split(" ") } },
    //       { description: { $regex: regex } },
    //       { score: { $meta: "textScore" } },
    //     ],
    //   })
    //   .sort({ createdAt: "desc" })
    //   .limit(resPerPage)
    //   .sort({ score: { $meta: "textScore" } })
    //   .skip(skip);
    const result1 = this.postsModel
      .find(
        { description: { $regex: regex } },
        //{ score: { $meta: "textScore" } }
      )
      .sort({ createdAt: "desc" })
      .limit(resPerPage)
      //.sort({ score: { $meta: "textScore" } })
      .skip(skip);
    const result2 = this.postsModel
      .find(
        {
          $text: { $search: tag },
          tags: { $in: tag.split(" ") },
        },
        { score: { $meta: "textScore" } }
      )
      .sort({ createdAt: "desc" })
      .limit(resPerPage)
      .sort({ score: { $meta: "textScore" } })
      .skip(skip);
    
    const combinedResults = await Promise.all([result1, result2]);
    const mergedResults = [...combinedResults[0], ...combinedResults[1]];
    const result = mergedResults
      
    if (!result) {
      throw new NotFoundException("Searched posts not found");
    }
    return result;
  }
}
