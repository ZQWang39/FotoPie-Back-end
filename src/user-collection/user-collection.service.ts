import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Collect } from "./schema/collect.schema";
import { User } from "src/user/schemas/user.schema";

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
    collect_userEmail: string
  ): Promise<Collect[]> {
    return this.collectModel.find({ collect_userEmail });
  }
}
