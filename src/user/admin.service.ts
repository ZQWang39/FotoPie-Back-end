import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./schema/user.schema";
import * as mongoose from "mongoose";

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(User.name) private userModel: mongoose.Model<User>
  ) {}

  async findAllUser() {
    const users = await this.userModel.find().exec();
    return users;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email });
    if (!user) throw new NotFoundException();
    return user;
  }

  async updateByEmail(email: string, rt: string): Promise<void> {
    const user = await this.userModel.updateOne(
      { email },
      { refreshToken: rt }
    );
    if (!user) throw new NotFoundException();
    return null;
  }
}
