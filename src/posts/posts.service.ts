import { ConflictException, Req } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Posts, PostDocument } from "./schema/post.schema";
import { Observable } from "rxjs";
import { UserService } from "src/user/user.service";
import { PostDTO } from "./dto/post.dto";
import { User, UserDocument } from "../user/schemas/user.schema";
import { Query } from "express-serve-static-core";
import { join } from "path";
import { CommentDto } from "./dto/comment.dto";


// const slugify = require(slugify)

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Posts.name) private readonly postModel: Model<PostDocument>,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private userService: UserService,
  ) {}

  public async create(posts: Posts) {
    const newPosts = new this.postModel(posts);
    return newPosts.save();
  }

  async findAllPosts(query: Query): Promise<PostDocument[]> {
    const resPerPage = Number(query.limit);
    const currentPage = Number(query.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    const paginatedImage = this.postModel
      .find()
      .sort({ createdAt: "desc" })
      .limit(resPerPage)
      .skip(skip);

    return paginatedImage;
  }
  //to add this comments
   async createComment(contentData:CommentDto, userEmail):Promise<Posts>{
    const {firstName} = await this.userService.findByEmail(userEmail)
    const newComment = {
      _id: new mongoose.Types.ObjectId(),
      content: contentData.content,
      commentUser: firstName,
    }

    const post = await this.postModel.findOneAndUpdate(
      {filename: contentData.fileName},
      {$push: { comments: newComment } },
      {new: true}
    )
    return post
   }
   //to delete this comments
   async deleteComment(contentData:CommentDto):Promise<void>{
      await this.postModel.findOneAndUpdate(
      {filename: contentData.fileName},
      {$pull: {comments:{_id: contentData.contentId}}},
    )
   }

   //find all comment through pagination
   async findAllComment(query:Query):Promise<PostDocument[]>{
    const resPerPage = Number(query.limit);
    const currentPage = Number(query.page) || 1
    const skip = resPerPage * (currentPage-1);

    const paginatedImage = this.postModel
      .find()
      .skip(skip)
      .limit(resPerPage)
      .exec()

    return paginatedImage
   }
}