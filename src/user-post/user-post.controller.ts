import { Controller, Get, Param, Res } from "@nestjs/common";
import { UserPostService } from "./user-post.service";

@Controller("post")
export class UserPost {
  constructor(private userPostService: UserPostService) {}

  @Get(":userEmail")
  async getUserPostFromEmail(@Param("userEmail") userEmail: string) {
    const posts = await this.userPostService.findAllPostsByUserEmail(userEmail);
    return posts;
  }

}

