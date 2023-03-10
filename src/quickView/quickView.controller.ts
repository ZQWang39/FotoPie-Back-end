import {
  Controller,
  Post,
  Query,
  Body,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { QuickViewService } from "./quickView.service";
import { Post_Data } from "./types/post-data.type";

@Controller()
export class QuickViewController {
  constructor(private quickViewService: QuickViewService) {}

  @Post("quickView")
  @HttpCode(HttpStatus.OK)
  async getPostInfo(
    @Query("filename") filename: string,
    @Body("accessToken") token: { accessToken: string }
  ): Promise<Post_Data> {
    const post_data = await this.quickViewService.getPostData(filename, token);
    return post_data;
  }
}
