import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { CreateLikeDto } from './Dto/createLike.dto';
import { UserLikeDto } from './Dto/UserLike.dto';
import { Like, LikeDocument } from './schemas/like.schema';
import { Posts } from './schemas/post.schema';

@Injectable()
export class LikeService {
    constructor(
        @InjectModel("Like") private readonly likeModel: Model<LikeDocument>, 
        @InjectModel("Posts") private readonly postModel: Model<Posts>,
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

    async deleteLike(userLikeDto: UserLikeDto){
      return await this.likeModel.deleteOne({userLikeDto})
    }

    async checkLike(userLikeDto: UserLikeDto){
      const checkLikeData = await this.likeModel.findOne(userLikeDto);

      if(checkLikeData)
      return this.deleteLike
      if(!checkLikeData)
      return this.addLike
    }

    async numberLike(createLikeDto:CreateLikeDto){
      return this.likeModel.count(createLikeDto)
    }

    async findEmailByFilename(createLikeDto:CreateLikeDto):Promise<string>{
      const findThePost = await this.postModel.findOne(createLikeDto);
      if(!findThePost) throw new NotFoundException;
      return findThePost.userEmail;
    }

}
