import { EditUserService } from "./editUser.service";
import { Body, Controller, Patch, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guards";
import { EditUserDto } from "./dto/edit-user.dto";
import { Request } from "express";

@UseGuards(JwtAuthGuard)
@Controller("editUser")
export class EditUserController {
  constructor(private editUserService: EditUserService) {}

  @Patch("/updateName")
  editUser(@Req() req: Request, @Body() dto: EditUserDto) {
    const userEmail = req.user["email"];
    return this.editUserService.updateNameByEmail(userEmail, dto);
  }
}
