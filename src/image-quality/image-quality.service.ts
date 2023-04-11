import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { Quality, QualityDocument } from "./schema/image-quality.schema";
import { Posts } from "../posts/schema/post.schema";
import { ImageQualityDto } from "./dto/image-quality.dto";
import { Query } from "express-serve-static-core";

@Injectable()
export class QualityService {
  constructor(
    //@InjectModel("Posts") private readonly postModel: Model<Posts>,
    @InjectModel("Quality")
    private readonly QualityModel: Model<QualityDocument>
  ) {}

  public async create(quality: Quality) {
    const newQuality = new this.QualityModel(quality);
    return newQuality.save();
  }

  async findAllQualityPosts(query: Query): Promise<QualityDocument[]> {
    const resPerPage = Number(query.limit);
    const currentPage = Number(query.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    const paginatedQualityPosts = this.QualityModel.find()
      .sort({ score: -1 })
      .limit(resPerPage)
      .skip(skip);

    return paginatedQualityPosts;
  }
}
