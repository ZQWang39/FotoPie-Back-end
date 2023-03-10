import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { Collect, CollectDocument } from "./schemas/collect.schema";
import { Posts } from "./schemas/post.schema";
import { CreateCollectDto } from "./dto/createCollect.dto";
import { UserCollectDto } from "./dto/userCollect.dto";

@Injectable()
export class CollectService {
  constructor(
    @InjectModel("Posts") private readonly postModel: Model<Posts>,
    @InjectModel("Collect")
    private readonly collectModel: Model<CollectDocument>
  ) {}

  //find collected user email
  async findEmailByFilename(
    createCollectDto: CreateCollectDto
  ): Promise<string> {
    const post = await this.postModel.findOne(createCollectDto);
    if (!post) throw new NotFoundException();
    return post.userEmail;
  }

  //add a collect
  async addCollect(userCollectDto) {
    const newCollect = new this.collectModel(userCollectDto);
    return this.collectModel.create(newCollect);
  }

  //delete a collect
  async deleteCollect(userCollectDto: UserCollectDto) {
    return await this.collectModel.deleteOne(userCollectDto);
  }

  async checkCollect(userCollectDto: UserCollectDto) {
    const checkCollectData = await this.collectModel.findOne(userCollectDto);
    if (checkCollectData) {
      return this.deleteCollect(userCollectDto);
    } else {
      return this.addCollect(userCollectDto);
    }
  }

  //get collect number
  async collectNumber(createCollectDto: CreateCollectDto) {
    return await this.collectModel.count(createCollectDto);
  }
}
