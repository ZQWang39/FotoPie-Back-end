import {
  ForbiddenException,
  Injectable,
  NotFoundException,
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

  async login({ email, password }: LoginUserDto): Promise<Tokens> {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new NotFoundException();
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new ForbiddenException();
    }
     const {_id} = user;
    const tokens = await this.getTokens(email);
    await this.updateRt(email, tokens.refresh_token);
    return {...tokens, _id};
  }

  async logout(email: string) {
    await this.updateRt(email, "");
  }

  async refresh(email: string, rt: string) {
    const user = await this.userService.findByEmail(email);

    if (!user || !user.refreshToken) throw new NotFoundException();

    const decoded = await this.jwtService.verify(rt, {
      secret: this.configService.get("refresh_token_key_public"),
    });

    if (!decoded || typeof decoded === "string") throw new NotFoundException();

    if (user.refreshToken !== rt) throw new ForbiddenException();

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

  async verifyRt(rt: string) {
    const decoded = this.jwtService.verify(rt, {
      secret: this.configService.get("refresh_token_key_public"),
    });
    if (!decoded || typeof decoded === "string") throw new NotFoundException();

    return decoded;
  }

  async updateRt(email: string, rt: string): Promise<void> {
    await this.userService.updateRefreshTokenByEmail(email, rt);
  }

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
