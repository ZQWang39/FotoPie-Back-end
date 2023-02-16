import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Req,
} from "@nestjs/common";
import { LoginUserDto } from "./dto/login-user.dto";
import { Tokens } from "./types/tokens.type";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  @HttpCode(HttpStatus.OK)
  login(@Body("user") loginUserDto: LoginUserDto): Promise<Tokens> {
    return this.authService.login(loginUserDto);
  }

  @UseGuards(AuthGuard("jwt-refresh"))
  @Post("refresh")
  @HttpCode(HttpStatus.OK)
  refreshAccessToken(@Req() req: Request, rt: string) {
    const user = req.user;
    return this.authService.refresh(user["email"], rt);
  }

  @UseGuards(AuthGuard("jwt"))
  @Post("logout")
  @HttpCode(HttpStatus.OK)
  logout(@Req() req: Request) {
    const user = req.user;
    return this.authService.logout(user["email"]);
  }
}
