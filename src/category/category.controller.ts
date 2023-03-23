import { Controller, Get, Param } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { Query } from "@nestjs/common/decorators";
import { Query as ExpressQuery } from "express-serve-static-core";

@Controller("category")
export class Category {
  constructor(private categoryService: CategoryService) {}

  @Get(":tag")
  async getCategoryPostsData(
    @Param("tag") tag: string,
    @Query() query: ExpressQuery
  ) {
    
    const categoryPosts = await this.categoryService.getCategoryPostsIdByTag(
      tag,
      query
    );
    const compressed_s3Url = process.env.BUCKET_PHOTO_COMPRESSION_PREFIX;

    return categoryPosts.map(({ _id, filename, userEmail, price, tag, description }) => {
      return {
        _id,
        compressed_imageUrl: `${compressed_s3Url}/${filename}`,
        userEmail,
        price,
        tag,
        description,
        filename
      };
    });
  }
}
