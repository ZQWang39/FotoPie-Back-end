import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./schema/user.schema";
import { Model } from "mongoose";

@Injectable()
export class AdminService {
  constructor(@InjectModel("User") private userModel: Model<UserDocument>) {}

  // Get All User List
  async findAllUser(): Promise<User[]> {
    const users = await this.userModel.find().exec();
    return users;
  }

 // Through Email to find user in db
  async findByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email });
    if (!user) throw new NotFoundException();
    return user;
  }
  
}
