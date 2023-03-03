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

      async addLike(userLikeDto){
        console.log("like2"+userLikeDto);
        const newLike = new this.likeModel(userLikeDto);
        console.log("newLike"+newLike)
        return this.likeModel.create(newLike)
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
      console.log(userLikeDto)
      console.log("checkLikeData"+checkLikeData)
      if(checkLikeData)
      return this.deleteLike(userLikeDto)
      if(!checkLikeData)
      return this.addLike(userLikeDto)
      
    }

    async numberLike(createLikeDto:CreateLikeDto){
      return this.likeModel.count(createLikeDto)
    }

    async findEmailByFilename(createLikeDto:CreateLikeDto):Promise<string>{
      const findThePost = await this.postModel.findOne(createLikeDto);
      console.log(createLikeDto)
      console.log("findThePost"+findThePost)
      if(!findThePost) throw new NotFoundException;
      return findThePost.userEmail;
    }

    // async checkUserLogin(){
    //   const token = localStorage.access_token;
    //   if(!token) {
    //     this.res("sorry, you haven't log in",{
    //     }).then(()=>{
    //       self.redirect("/auth/login")
    //     })
    //     return false
    //   }
    //   return token
    // }

}
