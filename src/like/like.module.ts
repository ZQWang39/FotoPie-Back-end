import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { MongooseModule } from "@nestjs/mongoose";
import { Like, LikeSchema } from './schemas/like.schema';
import { LikeController } from './like.controller';
import { Posts, PostSchema } from '../posts/schema/post.schema';

@Module({
  imports:[
    MongooseModule.forFeature([{ name: Posts.name, schema: PostSchema }]),
    MongooseModule.forFeature([{ name: Like.name, schema: LikeSchema }]),
  ],
  controllers: [LikeController],
  providers: [LikeService],
  exports:[LikeService],
})
export class LikeModule {}
