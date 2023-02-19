import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Req,
} from "@nestjs/common";
import { AdminLoginDto } from "./dto/admin-login.dto";
import { Tokens } from "./types/tokens.type";
import { AdminAuthService } from "./admin-auth.service";

@Controller("admin-auth")
export class AdminAuthController {
  constructor(private readonly adminAuthService: AdminAuthService) {}
  @Post("admin/login")
  @HttpCode(HttpStatus.OK)
  adminLogin(@Body() adminLoginDto: AdminLoginDto): Promise<Tokens> {
    return this.adminAuthService.adminLogin(adminLoginDto);
  }

  @Post("refresh")
  @HttpCode(HttpStatus.OK)
  refreshAccessToken(@Req() req: Request) {
    const user = req.body;
    return this.adminAuthService.refresh(user["email"], user["refreshToken"]);
  }

  @Post("logout")
  @HttpCode(HttpStatus.OK)
  logout(@Req() req: Request) {
    const user = req.body;
    return this.adminAuthService.logout(user["email"]);
  }
}
