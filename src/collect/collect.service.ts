import { Injectable } from "@nestjs/common";
import mongoose, { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Collect, CollectDocument } from "./schemas/collect.schema";

@Injectable()
export class CollectService {
  constructor(
    @InjectModel(Collect.name)
    private readonly collectModel: Model<CollectDocument>
  ) {}

  async addCollect(
    collect_user,
    collected_user,
    post_id,
    id: mongoose.Schema.Types.ObjectId
  ) {
    const findCollectData = await this.collectModel.findOne({ id });
    // const addCollectData = await this.collectModel.insertOne({
    // collect_user: this.collectModel.collect_user,
    // collected_user: this.collectModel.collected_user,
    // post: this.collectModel.posts,
    // });
    //   if (findCollectData) return;
    //   if (!findCollectData)
    //     return addCollectData.length > 0 ? addCollectData.length : "0";
    // }

    //   async deleteCollect(
    //     collect_user,
    //     collected_user,
    //     post_id,
    //     id: mongoose.Schema.Types.ObjectId
    //   ) {
    //     const findCollectData = await this.collectModel.findOne({ id });
    //     const deleteCollectData = await this.collectModel.deleteOne({ id });

    //     if (findCollectData) return;
    //     if (!findCollectData)
    //       // return deleteCollectData.length > 0 ? deleteCollectData.length : "0";
  }
}
