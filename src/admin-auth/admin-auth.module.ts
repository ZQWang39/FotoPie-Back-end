import { Module } from "@nestjs/common";
import { AdminModule } from "src/admin/admin.module";
import { AdminAuthController } from "./admin-auth.controller";
import { AdminAuthService } from "./admin-auth.service";
import { AtStrategy } from "./strategies/at-strategy";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [AdminModule, JwtModule.register({})],
  controllers: [AdminAuthController],
  providers: [AdminAuthService, AtStrategy],
})
export class AdminAuthModule {}
