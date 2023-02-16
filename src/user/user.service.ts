import { Injectable, NotFoundException } from "@nestjs/common";
import mongoose, { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User, UserDocument } from "./schemas/user.schema";
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>
  ) {}
  create(createUserDto: CreateUserDto) {
    return "This action adds a new user";
  }

  findAll() {
    return `This action returns all user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email });
    if (!user) throw new NotFoundException();
    return user;
  }

  async findById(id: mongoose.Schema.Types.ObjectId): Promise<User> {
    const user = await this.userModel.findOne({ id });
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
