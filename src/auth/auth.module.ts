import { Module } from "@nestjs/common";
import { UserModule } from "src/user/user.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { refreshTokenStrategy } from "./strategies/refreshToken-strategy";
import { accessTokenStrategy } from "./strategies/accessToken-strategy";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [UserModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, accessTokenStrategy, refreshTokenStrategy],
})
export class AuthModule {}
