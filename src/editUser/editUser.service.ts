import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "src/user/schemas/user.schema";
import { EditUserDto } from "./dto/edit-user.dto";

@Injectable()
export class EditUserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>
  ) {}

  async updateNameByEmail(userEmail: string, dto: EditUserDto) {
    const updateUser = await this.userModel.findOneAndUpdate(
      { email: userEmail },
      { ...dto },
      { new: true }
    );

    if (!updateUser) throw new NotFoundException();
    return updateUser;
  }
}
