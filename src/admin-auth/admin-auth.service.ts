import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from "@nestjs/common";
import {  User } from "../admin/schema/user.schema";
import { AdminService } from "src/admin/admin.service";
import { JwtService } from "@nestjs/jwt";
import { Token } from "./types/tokens.type";
import { AdminLoginDto } from "./dto/admin-login.dto";
import * as bcrypt from "bcryptjs";

@Injectable()
export class AdminAuthService {
  constructor(
    private jwtService: JwtService,
    private readonly adminService: AdminService
  ) {}

  async authAdmin({ email, password }: AdminLoginDto): Promise<User> {
    const user = await this.adminService.findByEmail(email);
    if (!user) {
      throw new NotFoundException();
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new ForbiddenException();
    }
    return user;
  }

  async adminLogin({ email, password }: AdminLoginDto): Promise<Token> {
    const user = await this.adminService.findByEmail(email);
    console.log(user);
    // const user = await this.authAdmin({ email, password });
    if (!user) {
      throw new NotFoundException();
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new ForbiddenException();
    }
    if ("admin" !== user.role) {
      console.log(user.role);
      throw new ForbiddenException();
    }
    return await this.generateToken(email, user.role);
  }
  async generateToken(email: string, role: string): Promise<Token> {
    const tokens = await this.getTokens(email, role);
    return tokens;
  }


  async getTokens(email: string, role: string) {
    const at = await this.jwtService.signAsync(
      {
        email,
        role,
      },
      {
        algorithm: "RS256",
        secret: process.env.ACCESS_TOKEN_SECRET_PRIVATE,
        expiresIn: "15m",
      }
    );

    return {
      access_token: at,
    };
  }
}
