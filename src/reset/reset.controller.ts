import {
  Controller,
  Query,
  Post,
  Body,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { ResetService } from "./reset.service";
import { ResetRequestDto } from "./dto/reset-request.dto";
import { ResetPasswordDto } from "./dto/reset-password.dto";

@Controller("reset")
export class ResetController {
  constructor(private resetService: ResetService) {}

  @Post("resetRequest")
  @HttpCode(HttpStatus.OK)
  async resetRequest(
    @Body() email: ResetRequestDto
  ): Promise<{ message: string }> {
    return this.resetService.resetRequest(email);
  }

  @Post("resetPassword")
  @HttpCode(HttpStatus.OK)
  async resetPassword(
    @Query() token: { token: string },
    @Body() newPassword: ResetPasswordDto
  ): Promise<{ message: string }> {
    return this.resetService.resetPassword(token, newPassword);
  }
}
