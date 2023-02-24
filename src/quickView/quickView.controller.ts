import { Controller, Get, Param, Query, Res } from "@nestjs/common";
import { ObjectId } from "mongoose";
import { QuickViewService } from "./quickView.service";
import { Response } from "express";
import * as path from "path";

@Controller("quickView")
export class QuickViewController {
  constructor(private quickViewService: QuickViewService) {}

  @Get(":filename")
  async getPostInfo(@Param("filename") filename: string, @Res() res: Response) {
    const user_name = await this.quickViewService.getUsername(filename);
    const avatar = await this.quickViewService.getAvatar(filename);

    const photo_path = path.join(__dirname, "..", "..", "file", filename);
    const avatar_path = path.join(__dirname, "..", "..", "file", avatar);
    res.json(user_name);
    res.sendFile(photo_path);
    res.sendFile(avatar_path);
  }
}
