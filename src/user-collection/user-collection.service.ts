import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Collect } from "./schema/collect.schema";
import { User } from "src/user/schemas/user.schema";
import { Query } from "express-serve-static-core";

@Injectable()
export class UserCollectionService {
  constructor(
    @InjectModel(Collect.name) private collectModel: Model<Collect>,
    @InjectModel(User.name) private userModel: Model<User>
  ) {}

  async getUserEmailById(_id: string): Promise<string> {
    const user = await this.userModel.findOne({ _id }).exec();
    if (!user) {
      throw new NotFoundException();
    }
    return user.email;
  }
  async getCollectedPostsIdByCollectUserEmail(
    collect_user_email: string,
    query: Query
  ): Promise<Collect[]> {
    const resPerPage = Number(query.limit);
    const currentPage = Number(query.page) || 1;
    const skip = resPerPage * (currentPage - 1);
    return this.collectModel
      .find({ collect_user_email })
      .limit(resPerPage)
      .skip(skip);
  }
}
