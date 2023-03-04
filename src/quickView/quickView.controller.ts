import { Controller, Get, Query, HttpCode, HttpStatus } from "@nestjs/common";
import { QuickViewService } from "./quickView.service";
import * as path from "path";

@Controller()
export class QuickViewController {
  constructor(private quickViewService: QuickViewService) {}

  @Get("quickView")
  @HttpCode(HttpStatus.OK)
  async getPostInfo(@Query("filename") filename: string): Promise<object> {
    const user_name = await this.quickViewService.getUsername(filename);
    const avatar = await this.quickViewService.getAvatar(filename);
    const likes = await this.quickViewService.getLikes(filename);
    const collects = await this.quickViewService.getCollects(filename);

    //photo and avatar path
    const photo_url = path.join(process.env.BUCKET_PHOTO_PREFIX, filename);
    const avatar_url = path.join(process.env.BUCKET_AVATAR_PREFIX, avatar);

    //send response to front end: user_name, likes, collects, photo_url, avatar_url
    console.log({ user_name, likes, collects, photo_url, avatar_url });
    return { user_name, likes, collects, photo_url, avatar_url };
  }
}
