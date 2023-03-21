
import { SearchService } from './search.service'
import { Query } from "@nestjs/common/decorators";
import { Query as ExpressQuery } from "express-serve-static-core";
import { Controller, Get, Param } from "@nestjs/common";

@Controller('search')
export class SearchController {
    constructor(private SearchService: SearchService) { }
    
    @Get(":tag")
  async getCategoryPostsData(
    @Param("tag") tag: string,
    @Query() query: ExpressQuery
  ) {
    
    const categoryPosts = await this.SearchService.getSearchPostsIdByTag(
      tag,
      query
    );
    const s3Url = process.env.BUCKET_PHOTO_COMPRESSION_PREFIX;

    return categoryPosts.map(({ _id, filename, userEmail, price, tag, description }) => {
      return {
        _id,
        imageUrl: `${s3Url}/${filename}`,
        userEmail,
        price,
        tag,
        description
      };
    });
  }
    
}
