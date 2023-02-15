import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User, UserDocument } from "./schemas/user.schema";
import bcrypt from "bcryptjs";
import { JwtService } from "@nestjs/jwt";
import { Tokens } from "./types/tokens.typ";

@Injectable()
export class UserService {
  constructor(
    private jwtService: JwtService,
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

  //login logics
  async login({ email, password }: LoginUserDto): Promise<Tokens> {
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new NotFoundException();
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new ForbiddenException();
    }

    const tokens = await this.getTokens(email);
    await this.userModel.updateOne(
      { email },
      { refreshToken: tokens.refresh_token }
    );
    return tokens;
  }

  async logout(email: string) {
    await this.userModel.updateOne(
      { email },
      {
        refreshToken: null,
      }
    );
  }

  async refreshToken(email: string, rt: string) {
    const user = await this.userModel.findOne({ email });

    if (!user || !user.refreshToken) throw new ForbiddenException();

    if (user.refreshToken !== rt) throw new ForbiddenException();

    const tokens = await this.getTokens(email);
    await this.userModel.updateOne(
      { email },
      { refreshToken: tokens.refresh_token }
    );
    return tokens;
  }

  async getTokens(email: string) {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          email,
        },
        {
          secret: "at-secret",
          expiresIn: "15m",
        }
      ),
      this.jwtService.signAsync(
        {
          email,
        },
        {
          secret: "rt-secret",
          expiresIn: "7d",
        }
      ),
    ]);
    return {
      access_token: at,
      refresh_token: rt,
    };
  }
}
