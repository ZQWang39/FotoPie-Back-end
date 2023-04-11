import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { Quality, QualityDocument } from "./schema/image-quality.schema";
import { Posts } from "../posts/schema/post.schema";
import { ImageQualityDto } from "./dto/image-quality.dto";

@Injectable()
export class QualityService {
  constructor(
    //@InjectModel("Posts") private readonly postModel: Model<Posts>,
    @InjectModel("Quality")
    private readonly QualityModel: Model<QualityDocument>
  ) {}

}
