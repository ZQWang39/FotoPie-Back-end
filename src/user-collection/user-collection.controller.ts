import { Controller, Get, Param } from "@nestjs/common";
import { UserCollectionService } from "./user-collection.service";
import { Query} from "@nestjs/common/decorators";
import { Query as ExpressQuery } from "express-serve-static-core";

@Controller("user-collect")
export class UserCollection {
  constructor(private userCollectionService: UserCollectionService) {}

  @Get(":id")
  async getProfileCollectionData(
    @Param("id") id: string,
    @Query() query: ExpressQuery
  ) {
    const collect_user_email =
      await this.userCollectionService.getUserEmailById(id);
    const collectedPosts =
      await this.userCollectionService.getCollectedPostsIdByCollectUserEmail(
        collect_user_email,query
      );
    const s3Url = process.env.AWS_S3_URL;

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
