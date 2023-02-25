import {
  Controller,
  Get,
  Param,
  Query,
  Res,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { QuickViewService } from "./quickView.service";
import { Response } from "express";
import * as path from "path";

@Controller()
export class QuickViewController {
  constructor(private quickViewService: QuickViewService) {}

  @Get("quickView")
  @HttpCode(HttpStatus.OK)
  async getPostInfo(@Query("filename") filename: string, @Res() res: Response) {
    const user_name = await this.quickViewService.getUsername(filename);
    const avatar = await this.quickViewService.getAvatar(filename);

    //photo path and avatar path
    const photo_path = path.join(__dirname, "..", "..", "file", filename);
    const avatar_path = path.join(__dirname, "..", "..", "file", avatar);

    //send response to front end: user_name, photo, avatar
    res.json(user_name);
    res.sendFile(photo_path);
    res.sendFile(avatar_path);
  }
}
