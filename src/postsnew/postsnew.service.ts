import { ConflictException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Postsnew, PostnewDocument } from "./schema/postnew.schema";
import { Observable } from "rxjs";
import { UserService } from "src/user/user.service";
import { PostnewDTO } from "./dto/postnew.dto";
import { User, UserDocument } from "../user/schemas/user.schema";
import { Query } from "express-serve-static-core";
import { join } from "path";

// const slugify = require(slugify)

@Injectable()
export class PostsnewService {
  constructor(
    @InjectModel(Postsnew.name) private readonly postnewModel: Model<PostnewDocument>,
    private userService: UserService
  ) {}

  // public async create(UserEmail:string, PostDTO: PostDTO){
  //     const post = await this.postModel.create(PostDTO, User)
  //     return post
  //    const user  = await this.postModel.findOne({email: UserEmail})

  //     const post = new this.postModel(PostDTO, {email: UserEmail})

  //     return post.save();

  // }

  public async create(postsnew: Postsnew) {
    const newPosts = new this.postnewModel(postsnew);
    return newPosts.save();
  }

  async findAllPosts(query: Query): Promise<PostnewDocument[]> {
    const resPerPage = Number(query.limit);
    const currentPage = Number(query.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    const paginatedImage = this.postnewModel
      .find()
      .sort({ createdAt: "desc" })
      .limit(resPerPage)
      .skip(skip);

    return paginatedImage;
  }
}
