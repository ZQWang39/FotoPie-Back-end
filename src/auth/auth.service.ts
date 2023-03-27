import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { LoginUserDto } from "./dto/login-user.dto";
import * as bcrypt from "bcryptjs";
import { JwtService } from "@nestjs/jwt";
import { Tokens } from "./types/tokens.type";
import { UserService } from "src/user/user.service";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly userService: UserService,
    private configService: ConfigService
  ) {}

  // This is the method that is called when the user logs in
  async login({ email, password }: LoginUserDto): Promise<Tokens> {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new NotFoundException();
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new ForbiddenException();
    }

    const tokens = await this.getTokens(email);
    await this.updateRt(email, tokens.refresh_token);
    return tokens;
  }

  // This is the method that is called when the user logs out
  async logout(email: string) {
    await this.updateRt(email, "");
  }

  // This is the method that is called when the user refreshes the access token
  async refresh(rt: string) {
    const decoded = await this.jwtService.verify(rt, {
      secret: this.configService.get("refresh_token_key_public"),
    });
    if (!decoded || typeof decoded === "string")
      throw new UnauthorizedException("Invalid refresh token");

    const { email } = decoded;

    const user = await this.userService.findByEmail(email);

    if (!user || !user.refreshToken)
      throw new UnauthorizedException(
        "refresh token not found or user not found"
      );

    if (user.refreshToken !== rt)
      throw new UnauthorizedException("refresh token not match");

    const newAccessToken = this.jwtService.sign(
      {
        email,
      },
      {
        algorithm: "RS256",
        secret: this.configService.get("access_token_key_private"),
        expiresIn: "15m",
      }
    );

    return { access_token: newAccessToken };
  }

  // verify refresh token
  async verifyRt(rt: string) {
    const decoded = this.jwtService.verify(rt, {
      secret: this.configService.get("refresh_token_key_public"),
    });
    if (!decoded || typeof decoded === "string") throw new NotFoundException();

    return decoded;
  }

  // update refresh token
  async updateRt(email: string, rt: string): Promise<void> {
    await this.userService.updateRefreshTokenByEmail(email, rt);
  }

  // get access token and refresh token
  async getTokens(email: string) {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          email,
        },
        {
          algorithm: "RS256",
          secret: this.configService.get("access_token_key_private"),
          expiresIn: "15m",
        }
      ),
      this.jwtService.signAsync(
        {
          email,
        },
        {
          algorithm: "RS256",
          secret: this.configService.get("refresh_token_key_private"),
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
