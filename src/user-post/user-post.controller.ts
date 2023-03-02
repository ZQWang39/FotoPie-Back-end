import { Controller, Get, Param, Res } from "@nestjs/common";
import { UserPostService } from "./user-post.service";

@Controller()
export class UserPost {
  constructor(private userPostService: UserPostService) {}

  @Get()
  async getProfileData(@Param("id") id: string) {
    const userEmail = await this.userPostService.getUserEmailById(id);
    const posts = await this.userPostService.getPostsByUserEmail(userEmail);

    const post_filenames = posts.map((post) => {
      return post.filename;
    });

    const s3Url = "https://fotopie.s3.ap-southeast-2.amazonaws.com";

    const post_url = {
      imageUrl: post_filenames.map((post_filename) => {
        return `${s3Url}/${post_filename}`;
      }),
    };

    return post_url;
  }
}
