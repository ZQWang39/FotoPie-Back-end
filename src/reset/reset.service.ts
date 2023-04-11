import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { Model } from "mongoose";
import { User } from "../user/schemas/user.schema";
import { hash as bcryptHash } from "bcryptjs";
import { JwtService as NestJwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { ResetRequestDto } from "./dto/reset-request.dto";
import * as mailgun from "mailgun-js";
import { ConfigService } from "@nestjs/config";

@Injectable({})
export class ResetService {
  private readonly mailgunClient: mailgun.Mailgun;
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly nestJwtService: NestJwtService,
    private ConfigService: ConfigService
  ) {}

  //---------------Main Services---------------
  //send reset request
  async resetRequest({ email }: ResetRequestDto): Promise<{ message: string }> {
    //Search the db and see if this email exists
    const user = await this.findOneByEmail(email);

    //if email does not exist, print not found
    if (!user) {
      throw new NotFoundException("Invalid Email, Please try again!");
    }
    //if the email exists, sign the JWT token with the secret key
    const payload = {
      email: email,
    };
    const token = this.nestJwtService.sign(payload);
    if (!token) {
      throw new Error("Failed to sign token");
    }

    try {
      //send the token via email
      await this.sendPasswordResetEmail(email, token);

      return { message: "Email Sent Successfully" };
    } catch (e) {
      throw new Error("Failed to send email");
    }
  }

  //reset password
  async resetPassword(
    token: string,
    password: string
  ): Promise<{ message: string }> {
    //After user enters password and click submit, verify the token
    //valid:
    try {
      const decodedToken = await this.nestJwtService.verify(token);
      console.log(decodedToken);

      if (!decodedToken)
        throw new UnauthorizedException("Invalid Token, Please try again.");

      const userEmail = decodedToken.email;

      //hash the new password
      const hashedPassword = await this.hash(password);

      if (!hashedPassword)
        throw new Error("Something went wrong, please try again.");

      //update the new password in db
      await this.userModel
        .findOneAndUpdate(
          { email: userEmail },
          { password: hashedPassword },
          { new: true }
        )
        .exec();

      return { message: "Password has been updated" };

      //invalid:
    } catch (error) {
      throw new UnauthorizedException(
        "Something went wrong, please try again."
      );
    }
  }

  //------------Utility services-------------
  //find the user in db
  async findOneByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email }).exec();
  }

  //hash the password
  async hash(password: string): Promise<string> {
    const saltRounds = 10;
    return bcryptHash(password, saltRounds);
  }

  //sign a JWT token with user ID and email
  async sign(user: User): Promise<string> {
    const payload = { _id: user._id, email: user.email };
    return this.nestJwtService.sign(payload);
  }

  //mailgun email service
  async sendPasswordResetEmail(
    email: string,
    token: string
  ): Promise<{ message: string }> {
    const api_key = this.ConfigService.get("mailgun_api_key");
    const DOMAIN = "fotopie.net";

    const mg = mailgun({
      apiKey: api_key,
      domain: DOMAIN,
    });

    const data = {
      from: "info@fotopie.net",
      to: email,
      subject: "Reset Password Email Verification",
      html: `
          <p>Hi,</p>
          <p>You have requested to reset your password. Please click the link below to reset your password:</p>
          <p><a href="${this.ConfigService.get(
            "frontend_url"
          )}/reset/reset-password?token=${token}">Reset Password</a></p>
          <p>If you did not make this request, you can safely ignore this email.</p>
          <p>Best regards,</p>
          <p>FotoPie Support Team</p>
        `,
    };

    try {
      await mg.messages().send(data);

      return { message: "Email has been sent" };
    } catch (error) {
      throw new Error("Failed to send email");
    }
  }
}
