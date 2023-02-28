import {
  Controller,
  Get,
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
    const likes = await this.quickViewService.getLikes(filename);
    const collects = await this.quickViewService.getCollects(filename);

    //photo and avatar path
    const photo_path = path.join(__dirname, "..", "..", "file", filename);
    const avatar_path = path.join(__dirname, "..", "..", "file", avatar);

    //send response to front end: user_name, likes, collects, photo, avatar
    const postInfo = { user_name, likes, collects };
    res.json(postInfo);
    res.sendFile(photo_path);
    res.sendFile(avatar_path);
  }
}
