import { Module } from '@nestjs/common';
import { Postsnew, PostnewSchema } from "../postsnew/schema/postnew.schema";
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports:[
  MongooseModule.forFeature([{ name: Postsnew.name, schema: PostnewSchema }])],
  controllers: [SearchController],
  providers: [SearchService],
  exports:[SearchService],
})
export class SearchModule {}
