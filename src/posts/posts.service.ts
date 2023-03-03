import { ConflictException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
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

// const slugify = require(slugify)

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Posts.name) private readonly postModel: Model<PostDocument>,
    private userService: UserService
  ) {}

  // public async create(UserEmail:string, PostDTO: PostDTO){
  //     const post = await this.postModel.create(PostDTO, User)
  //     return post
  //    const user  = await this.postModel.findOne({email: UserEmail})

  //     const post = new this.postModel(PostDTO, {email: UserEmail})

  //     return post.save();

  // }

  public async create(posts: Posts) {
    const newPosts = new this.postModel(posts);
    return newPosts.save();
  }

  async findAllPosts(query: Query): Promise<string[]> {
    const resPerPage = Number(query.limit);
    const currentPage = Number(query.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    const paginatedImage = this.postModel
      .find()
      .sort({ createdAt: "desc" })
      .limit(resPerPage)
      .skip(skip);

    const paginatedImageJoin = (await paginatedImage).map((item) =>
      join("https://fotopie.s3.ap-southeast-2.amazonaws.com/" + item.filename)
    );

    return paginatedImageJoin;
  }
}
