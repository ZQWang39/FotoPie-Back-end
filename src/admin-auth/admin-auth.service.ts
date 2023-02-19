import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from "@nestjs/common";
import * as mongoose from "mongoose";
import { Role, User } from "../user/schema/user.schema";
import { AdminService } from "src/user/admin.service";
import { InjectModel } from "@nestjs/mongoose";
import { JwtService } from "@nestjs/jwt";
import { Tokens } from "./types/tokens.type";
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

  async generateToken(email: string, role: string): Promise<Tokens> {
    const tokens = await this.getTokens(email, role);
    await this.updateRt(email, tokens.refresh_token);
    return tokens;
  }

  async adminLogin({ email, password }: AdminLoginDto): Promise<Tokens> {
    const user = await this.authAdmin({ email, password });
    if (user.role !== Role.ADMIN) {
      throw new ForbiddenException();
    }
    return await this.generateToken(email, user.role);
  }

  async logout(email: string) {
    await this.updateRt(email, null);
  }

  async refresh(email: string, rt: string) {
    const user = await this.adminService.findByEmail(email);

    if (!user || !user.refreshToken) throw new NotFoundException();

    const decoded = await this.jwtService.verify(rt, {
      secret: process.env.REFRESH_TOKEN_SECRET,
    });

    if (!decoded || typeof decoded === "string") throw new NotFoundException();

    if (user.refreshToken !== rt) throw new ForbiddenException();

    const newAt = this.jwtService.signAsync(
      {
        email,
        role: user.role,
      },
      {
        algorithm: "RS256",
        secret: process.env.ACCESS_TOKEN_SECRET_PRIVATE,
        expiresIn: "15m",
      }
    );

    return newAt;
  }
  async updateRt(email: string, rt: string): Promise<void> {
    await this.adminService.updateByEmail(email, rt);
  }

  async getTokens(email: string, role: string) {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          email,
          role,
        },
        {
          algorithm: "RS256",
          secret: process.env.ACCESS_TOKEN_SECRET_PRIVATE,
          expiresIn: "15m",
        }
      ),
      this.jwtService.signAsync(
        {
          email,
          role,
        },
        {
          algorithm: "RS256",
          secret: process.env.REFRESH_TOKEN_SECRET_PRIVATE,
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
