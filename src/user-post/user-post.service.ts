import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Posts } from "./schema/post.schema";




@Injectable()
export class UserPostService {
  constructor(@InjectModel(Posts.name) private postModel: Model<Posts>) {}

  async findAllPostsByUserEmail(userEmail:string){
    const post = await this.postModel.find({userEmail});
    return post;
  }

}


