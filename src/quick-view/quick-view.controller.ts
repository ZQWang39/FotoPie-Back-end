import {
  Controller,
  Get,
  Headers,
  Query,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { QuickViewService } from "./quick-view.service";

interface Post_Data {
  user_name: string;
  user_id: string;
  like_count: number;
  like_status: boolean;
  collect_count: number;
  collect_status: boolean;
  photo_url: string;
  avatar_url: string;
}

@Controller("quick-view")
export class QuickViewController {
  constructor(private quickViewService: QuickViewService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getPostInfo(
    @Query("filename") filename: string,
    @Headers("Authorization") accessToken: string
  ): Promise<Post_Data> {
    console.log(filename);
    console.log(accessToken);
    const post_data = await this.quickViewService.getPostData(
      filename,
      accessToken
    );
    return post_data;
  }
}
