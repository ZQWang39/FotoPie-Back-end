import { Controller, Get, Param } from "@nestjs/common";
import { UserCollectionService } from "./user-collection.service";

@Controller("user-collect")
export class UserCollection {
  constructor(private userCollectionService: UserCollectionService) {}

  @Get(":id")
  async getProfileCollectionData(@Param("id") id: string) {
    const collect_userEmail = await this.userCollectionService.getUserEmailById(
      id
    );
    const collectedPosts =
      await this.userCollectionService.getCollectedPostsIdByCollectUserEmail(
        collect_userEmail
      );
    const s3Url = "https://fotopie.s3.ap-southeast-2.amazonaws.com";

    return collectedPosts.map(
      ({ _id, filename, collect_user_email, collected_user_email }) => {
        return {
          _id,
          imageUrl: `${s3Url}/${filename}`,
          collect_user_email,
          collected_user_email,
        };
      }
    );
  }
}
