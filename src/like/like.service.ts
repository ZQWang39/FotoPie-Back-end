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

    async addLike(like_user_id, liked_user_id, post_id, ){ 
      const addLikeData = await this.likeModel.insertMany({
        "like_user": like_user_id ,"liked_user": liked_user_id,"post": post_id,
      })
      return addLikeData
    }

    async checkLike(like_user_id: string, liked_user_id: string, post_id: string, createLikeDto:CreateLikeDto ){
      const checkLikeData = await this.likeModel.findOne({like_user_id, liked_user_id, post_id});
      const deleteLikeData = await this.likeModel.deleteOne({like_user_id,liked_user_id, post_id});
      
      if(checkLikeData)
      return deleteLikeData
      if(!checkLikeData)
      return this.addLike
    }

    async numberLike(_id){
      return this.likeModel.count(_id)
    }

    
    



}
