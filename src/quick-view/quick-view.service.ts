import { Injectable, NotFoundException } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Posts } from "./schema/post.schema";
import { User } from "../user/schemas/user.schema";
import { Collect } from "./schema/collect.schema";
import { Like } from "./schema/like.schema";
import { JwtService } from "@nestjs/jwt";
import * as path from "path";

interface Post_Data {
  user_name: string;
  user_id: string;
  like_count: number;
  like_status: boolean;
  collect_count: number;
  collect_status: boolean;
  photo_url: string;
  avatar_url: string;
}

@Injectable()
export class QuickViewService {
  constructor(
    @InjectModel("Posts") private readonly postsModel: Model<Posts>,
    @InjectModel("User") private readonly userModel: Model<User>,
    @InjectModel("Like") private readonly likeModel: Model<Like>,
    @InjectModel("Collect") private readonly collectModel: Model<Collect>,
    private readonly jwtService: JwtService
  ) {}

  async getPostData(filename: string, accessToken: string): Promise<Post_Data> {
    // get user_name
    const post = await this.findPostByFilename(filename);
    const user = await this.findUserByEmail(post.userEmail);
    const user_name = user.firstName + " " + user.lastName;

    // get user_id
    const user_id = user._id.toString();

    // get avatar
    const avatar = user.avatar;

    // get like_count
    const like_count = await this.likeModel.count({ filename });

    // get collect_count
    const collect_count = await this.collectModel.count({ filename });

    // photo_url
    const photo_url = path.join(
      process.env.BUCKET_PHOTO_COMPRESSION_PREFIX,
      filename
    );
    // avatar_url
    const avatar_url = path.join(process.env.BUCKET_AVATAR_PREFIX, avatar);

    if (accessToken) {
      // accessToken in Header starts with 'Bearer', need to split it our and get the real token
      const token = accessToken.split(" ")[1];

      // decode token
      const decodedToken = await this.verifyToken(token);
      const login_user_email = decodedToken.email;

      // check if user liked this post before
      const like_status = await this.getLikeStatus(login_user_email, filename);

      // check if user collected this post before
      const collect_status = await this.getCollectStatus(
        login_user_email,
        filename
      );

      // return data to front end
      const post_data = {
        user_name,
        user_id,
        like_count,
        like_status,
        collect_count,
        collect_status,
        photo_url,
        avatar_url,
      };
      return post_data;
    } else {
      // like and collect status is false by default if the user does not login
      const like_status = false;
      const collect_status = false;

      // return data to front end
      const post_data = {
        user_name,
        user_id,
        like_count,
        like_status,
        collect_count,
        collect_status,
        photo_url,
        avatar_url,
      };
      return post_data;
    }
  }

  async getLikeStatus(
    login_user_email: string,
    filename: string
  ): Promise<boolean> {
    const like = await this.likeModel.findOne({
      like_user_email: login_user_email,
      filename: filename,
    });

    let like_status: boolean | null = null;
    if (like === null) {
      like_status = false;
      return like_status;
    } else {
      like_status = true;
      return like_status;
    }
  }

  async getCollectStatus(
    login_user_email: string,
    filename: string
  ): Promise<boolean> {
    const collect = await this.collectModel.findOne({
      collect_user_email: login_user_email,
      filename: filename,
    });

    let collect_status: boolean | null = null;
    if (collect === null) {
      collect_status = false;
      return collect_status;
    } else {
      collect_status = true;
      return collect_status;
    }
  }

  async findPostByFilename(filename: string): Promise<Posts> {
    const post = await this.postsModel.findOne({ filename });
    if (!post) throw new NotFoundException();
    return post;
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email });
    if (!user) throw new NotFoundException();
    return user;
  }

  //verify the token
  async verifyToken(token: string): Promise<{ email: string }> {
    const decodedToken = this.jwtService.verify(token, {
      secret: process.env.ACCESS_TOKEN_SECRET_PUBLIC,
    });
    if (!decodedToken || typeof decodedToken === "string")
      throw new NotFoundException();
    return decodedToken;
  }
}
