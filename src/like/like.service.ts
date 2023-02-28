import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { CreateLikeDto } from './Dto/createLike.dto';
import { Like, LikeDocument } from './schemas/like.schema';

@Injectable()
export class LikeService {
    constructor(
        @InjectModel(Like.name) private readonly likeModel: Model<LikeDocument>
      ) {}

    async addLike(like_user_email, liked_user_email, fileName, ){ 
      const addLikeData = await this.likeModel.create({
        like_user_email ,
        liked_user_email,
        fileName,
      })
      return addLikeData
    }

    async deleteLike(like_user_email, liked_user_email, fileName,){
      return await this.likeModel.deleteOne({
        like_user_email,
        liked_user_email,
        fileName,
      })
    }

    async checkLike(createLikeDto:CreateLikeDto ){
      const checkLikeData = await this.likeModel.findOne(createLikeDto);

      if(checkLikeData)
      return this.deleteLike
      if(!checkLikeData)
      return this.addLike
    }

    async numberLike(fileName){
      return this.likeModel.count(fileName)
    }

    async findEmailByFilename(){
    }

}
