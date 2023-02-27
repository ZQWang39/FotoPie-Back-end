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

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private jwtService: JwtService
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
      secret: process.env.JWT_ACTIVIATE_SECRET_KEY,
      expiresIn: process.env.EXPIRE,
    });

    const url = `${process.env.EMAIL_CONFIRMATION_URL}/${token}`;

    const text = `Welcome to the application. To confirm the email address, click here: ${url}`;
    const DOMAIN = process.env.DOMAIN;
    const mg = mailgun({ apiKey: process.env.MAILGUN_APIKEY, domain: DOMAIN });

    try {
      return mg.messages().send({
        from: process.env.EMAIL_SEND,
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
      secret: process.env.JWT_ACTIVIATE_SECRET_KEY,
    });

    const { firstName, lastName, email, password } = payload;

    const hash = await bcrypt.hash(password, 5);
    if (await this.userModel.findOne({ email })) {
      throw new ConflictException("User already exist");
    } else {
      try {
        const createduser = await this.userModel.create({
          firstName,
          lastName,
          password: hash,
          email,
        });
        return { createduser };
      } catch (error) {
        throw new UnauthorizedException("Invalid Token");
      }
    }
  }
}
