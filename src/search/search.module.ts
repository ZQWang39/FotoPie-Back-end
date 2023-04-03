import { Module } from '@nestjs/common';
import { Posts, PostSchema } from "../posts/schema/post.schema";
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports:[
  MongooseModule.forFeature([{ name: Posts.name, schema: PostSchema }])],
  controllers: [SearchController],
  providers: [SearchService],
  exports:[SearchService],
})
export class SearchModule {}
