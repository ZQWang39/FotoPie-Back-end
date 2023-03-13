import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { Model } from "mongoose";
import { User } from "./schemas/user.schema";
import { hash as bcryptHash } from "bcryptjs";
import { JwtService as NestJwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { ResetPasswordDto } from "./dto/reset-password.dto";
import { ResetRequestDto } from "./dto/reset-request.dto";
import * as mailgun from "mailgun-js";

@Injectable({})
export class ResetService {
  private readonly mailgunClient: mailgun.Mailgun;
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly nestJwtService: NestJwtService
  ) {}

  //---------------Main Services---------------
  //send reset request service
  async resetRequest({ email }: ResetRequestDto): Promise<{ message: string }> {
    //Search the db and see if this email exists
    const user = await this.findOneByEmail(email);
    console.log(user);

    //if email does not exist, print not found
    if (!user) {
      console.log("User Not Found");
      throw new NotFoundException("User not found");
    }

    //if the email exists, sign the JWT token with the secret key
    console.log("User exist!");
    const payload = {
      email: email,
    };
    const token = await this.nestJwtService.sign(payload);
    console.log(token);

    //send the token via email
    await this.sendPasswordResetEmail(email, token);

    return { message: "Email Sent Successfully" };
  }

  //reset password service
  async resetPassword(
    token: { token: string },
    resetPasswordDto: ResetPasswordDto
  ): Promise<{ message: string }> {
    //After user enters password and click submit, verify the token
    //valid:
    try {
      //token = {token: "dsfhjkhwejkr32094732"}
      const decodedToken = await this.verifyAsync(token.token);
      // decodedToken = {
      //   email: string;  // user email
      // };
      console.log(decodedToken);

      const userEmail = decodedToken.email;
      //hash the new password
      const hashedPassword = await this.hash(resetPasswordDto.password);
      console.log(resetPasswordDto.password);
      console.log(hashedPassword);

      //update the new password in db
      await this.userModel
        .findOneAndUpdate(
          { email: userEmail },

          { password: hashedPassword },
          { new: true }
        )
        .exec();

      console.log("Password has been updated");
      return { message: "Password has been updated" };

      //invalid:
    } catch (error) {
      console.log("Invalid token");
      throw new UnauthorizedException("Invalid Token");
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

  //verify the token
  async verifyAsync(token: string): Promise<{ email: string }> {
    return this.nestJwtService.verifyAsync<{ email: string }>(token);
  }

  //email service
  async sendPasswordResetEmail(
    email: string,
    token: string
  ): Promise<{ message: string }> {
    const api_key = process.env.MAILGUN_API_KEY;
    const DOMAIN = process.env.MAILGUN_DOMAIN;

    const mg = mailgun({
      apiKey: api_key,
      domain: DOMAIN,
    });

    const data = {
      from: "FotoPie <unswmercury@gmail.com>",
      to: "jeremy.zeyuliu@gmail.com",
      // to: `${email}`,
      subject: "Email Verification",
      html: `
          <p>Hi,</p>
          <p>You have requested to reset your password. Please click the link below to reset your password:</p>
          <p><a href="http://localhost:3000/reset-password?token=${token}">Reset Password</a></p>
          <p>If you did not make this request, you can safely ignore this email.</p>
          <p>Best regards,</p>
          <p>FotoPie Support Team</p>
        `,
    };

    try {
      await mg.messages().send(data);
      console.log("Email has been sent");
      return { message: "Email has been sent" };
    } catch (error) {
      console.log("Failed to send email", error);
      throw new Error("Failed to send email");
    }
  }
}
