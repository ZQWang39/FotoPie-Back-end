import { Module } from "@nestjs/common";
import { AdminModule } from "src/user/admin.module";
import { AdminAuthController } from "./admin-auth.controller";
import { AdminAuthService } from "./admin-auth.service";
import { RtStrategy } from "./strategies/rt-strategy";
import { AtStrategy } from "./strategies/at-strategy";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [AdminModule, JwtModule.register({})],
  controllers: [AdminAuthController],
  providers: [AdminAuthService, RtStrategy, AtStrategy],
})
export class AdminAuthModule {}
