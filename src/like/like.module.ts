import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { MongooseModule } from "@nestjs/mongoose";
import { Like, LikeSchema } from './schemas/like.schema';
import { LikeController } from './like.controller';

@Module({
  imports:[
    MongooseModule.forFeature([{name:Like.name, schema:LikeSchema }])
  ],
  controllers: [LikeController],
  providers: [LikeService],
  exports:[LikeService],
})
export class LikeModule {}
