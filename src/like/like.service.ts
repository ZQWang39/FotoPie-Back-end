import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { CreateLikeDto } from './Dto/createLike.dto';
import { Like, LikeDocument } from './schemas/like.schema';
import { Posts } from './schemas/post.schema';

@Injectable()
export class LikeService {
    constructor(
        @InjectModel(Like.name) private readonly likeModel: Model<LikeDocument>, 
        private readonly postModel: Model<Posts>,
      ) {}

      async addLike(like:Like){
        const newLike = new this.likeModel(like);
        return newLike.save()
      }

    // async addLike(like_user_email, liked_user_email, fileName, ){ 
    //   const addLikeData = await this.likeModel.create({
    //     like_user_email ,
    //     liked_user_email,
    //     fileName,
    //   })
    //   return addLikeData
    // }

    async deleteLike(like_user_email, liked_user_email, filename,){
      return await this.likeModel.deleteOne({
        like_user_email,
        liked_user_email,
        filename,
      })
    }

    async checkLike(CreateLikeDto:CreateLikeDto ){
      const checkLikeData = await this.likeModel.findOne(CreateLikeDto);

      if(checkLikeData)
      return this.deleteLike
      if(!checkLikeData)
      return this.addLike
    }

    async numberLike(filename){
      return this.likeModel.count(filename)
    }

    async findEmailByFilename(filename:string):Promise<string>{
      const findThePost = await this.postModel.findOne({filename});
      if(!findThePost) throw new NotFoundException;
      return findThePost.userEmail;
    }

}
