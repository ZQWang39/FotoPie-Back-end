import { Module } from "@nestjs/common";
import { UserModule } from "src/user/user.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { RtStrategy } from "./strategies/rt-strategy";
import { AtStrategy } from "./strategies/at-strategy";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [UserModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, RtStrategy, AtStrategy],
})
export class AuthModule {}
