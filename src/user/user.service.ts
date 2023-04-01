import {
  Injectable,
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
  ConflictException,
} from "@nestjs/common";
import mongoose, { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User, UserDocument } from "./schemas/user.schema";
import { JwtService } from "@nestjs/jwt";
import VerificationTokenPayload from "./interface/verificationTokenPayload.interface";
import * as bcrypt from "bcryptjs";
import * as mailgun from "mailgun-js";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private jwtService: JwtService,
    private ConfigService: ConfigService
  ) {}
  create(createUserDto: CreateUserDto) {
    return "This action adds a new user";
  }

  findAll() {
    const users = this.userModel.find().exec();
    if (!users) throw new NotFoundException();
    return users;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email }).exec();
    return user;
  }

  async findById(_id: string): Promise<User> {
    const user = await this.userModel.findOne({ _id }).exec();
    if (!user) throw new NotFoundException();
    return user;
  }

  async updateRefreshTokenByEmail(
    email: string,
    refreshToken: string
  ): Promise<void> {
    const user = await this.userModel.updateOne(
      { email },
      { refreshToken: refreshToken }
    );
    if (!user) throw new NotFoundException();
    return null;
  }

  async doesUserExists(createUserDTO: CreateUserDto): Promise<User> {
    const user = await this.userModel.findOne({ email: createUserDTO.email });
    if (user) {
      throw new ConflictException("User already exist");
    }

    return user;
  }

  public sendVerificationLink(
    email: string,
    firstName: string,
    lastName: string,
    password: string
  ) {
    const payload: VerificationTokenPayload = {
      email,
      firstName,
      lastName,
      password,
    };
    const token = this.jwtService.sign(payload, {
      secret: this.ConfigService.get("jwt_activate_secret_key"),
      expiresIn: "20m",
    });

    const url = `${this.ConfigService.get("frontend_url")}/activated/${token}`;

    const text = `Welcome to the application. To confirm the email address, click here: ${url}`;

    const mg = mailgun({
      apiKey: this.ConfigService.get("mailgun_api_key"),
      domain: "fotopie.net",
    });

    try {
      return mg.messages().send({
        from: "info@fotopie.net",
        to: email,
        subject: "Email confirmation",
        text,
      });
    } catch (error) {
      throw new BadRequestException("Failed to send email");
    }
  }

  public async decodeConfirmationToken(token: string) {
    const payload = await this.jwtService.verify(token, {
      secret: this.ConfigService.get("jwt_activate_secret_key"),
    });

    const { firstName, lastName, email, password } = payload;

    const hash = await bcrypt.hash(password, 5);
    if (await this.userModel.findOne({ email })) {
      throw new ConflictException("User already exist");
    } else {
      try {
        const createduser = new this.userModel({
          firstName,
          lastName,
          password: hash,
          email,
        });
        return await createduser.save();
      } catch (error) {
        throw new UnauthorizedException("Invalid Token");
      }
    }
  }
}
