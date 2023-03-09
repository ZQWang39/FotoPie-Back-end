import {
  Controller,
  Get,
  Query,
  Body,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { QuickViewService } from "./quickView.service";
import * as path from "path";
// import { JwtAuthGuard } from "../auth/guards/jwt-auth.guards";
// import { UseGuards } from "@nestjs/common/decorators";

@Controller()
export class QuickViewController {
  constructor(private quickViewService: QuickViewService) {}

  // @UseGuards(JwtAuthGuard)
  @Get("quickView")
  @HttpCode(HttpStatus.OK)
  async getPostInfo(
    @Query("filename") filename: string,
    @Body("accessToken") token: { token: string }
  ): Promise<object> {
    // const login_user_email = req.user["email"];

    const login_user_email = await this.quickViewService.getLoginUserEmail(
      token
    );
    const user_name = await this.quickViewService.getUsername(filename);
    const user_id = await this.quickViewService.getUserId(filename);
    const avatar = await this.quickViewService.getAvatar(filename);
    const like_count = await this.quickViewService.getLikes(filename);
    const collect_count = await this.quickViewService.getCollects(filename);
    const like_status = await this.quickViewService.getLikeStatus(
      login_user_email,
      filename
    );
    const collect_status = await this.quickViewService.getCollectStatus(
      login_user_email,
      filename
    );

    //photo and avatar path
    const photo_url = path.join(
      process.env.BUCKET_PHOTO_COMPRESSION_PREFIX,
      filename
    );
    const avatar_url = path.join(process.env.BUCKET_AVATAR_PREFIX, avatar);

    console.log({
      user_name,
      user_id,
      like_count,
      like_status,
      collect_count,
      collect_status,
      photo_url,
      avatar_url,
    });
    return {
      user_name,
      user_id,
      like_count,
      like_status,
      collect_count,
      collect_status,
      photo_url,
      avatar_url,
    };
  }
}
