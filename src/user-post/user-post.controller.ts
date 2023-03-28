import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Res,
} from "@nestjs/common";
import { UserPostService } from "./user-post.service";

@Controller("profile")
export class UserPost {
  constructor(private userPostService: UserPostService) {}

  @Get(":id")
  async getProfileData(@Param("id") id: string) {
    const userEmail = await this.userPostService.getUserEmailById(id);
    const posts = await this.userPostService.getPostsByUserEmail(userEmail);
    const s3Url =
      "https://fotopie-photo-compression.s3.ap-southeast-2.amazonaws.com";

    return posts.map(({ _id, filename, userEmail, price, tag }) => {
      return {
        _id,
        imageUrl: `${s3Url}/${filename}`,
        userEmail,
        price,
        tag,
      };
    });
  }
}
