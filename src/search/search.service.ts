import { Injectable } from '@nestjs/common';
import { Postsnew } from "../postsnew/schema/postnew.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Query } from "express-serve-static-core";

@Injectable()
export class SearchService {
  constructor(
    @InjectModel(Postsnew.name) private readonly postsModel: Model<Postsnew>
  ) {}
  async getSearchPostsIdByTag(tag: string, query: Query): Promise<Postsnew[]> {
    const resPerPage = Number(query.limit);
    const currentPage = Number(query.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    //const regex = new RegExp(tag, "i");

    return this.postsModel
      .find(
        { $text: { $search: tag }, tags: { $in: tag.split(" ") } },
        { score: { $meta: "textScore" } }
      )
      .sort({ createdAt: "desc" })
      .limit(resPerPage)
      .sort({ score: { $meta: "textScore" } })
      .skip(skip);
  }
}
