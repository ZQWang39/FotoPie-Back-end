import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from "../user/schemas/user.schema";
import { Posts, PostDocument } from 'src/like/schemas/post.schema';
import { LikeService } from 'src/like/like.service';
import { Like, LikeDocument } from '../like/schemas/like.schema';



@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Like.name)
    private LikeModel: Model<LikeDocument>,
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    @InjectModel(Posts.name)
    private postModel: Model<PostDocument>,

    // @InjectModel(Like.name)
    private readonly likeService: LikeService,
  ) {}


  async getLatestLikes(limit: number): Promise<Like[]> {
    return this.LikeModel.find().sort({ createdAt: -1 }).limit(limit).exec();
  }


  async getLikeUsers(like: Like): Promise<User[]> {
    const user = await this.userModel.findOne({ email: like.like_user_email }, { avatarPath: 1, firstName: 1 }).exec();
    if (!user) {
      return [];
    }
    return [user];
  }

  async getLikePosts(like: Like): Promise<Posts[]> {
    const post = await this.postModel.findOne({ filename: like.filename }, { compressFilePath: 1 }).exec();
    if (!post) {
      return [];
    }
    return [post];
  }

  async newLike(like: Like): Promise<void> {
    const users = await this.getLikeUsers(like);
    if (users.length > 0) {
      const likeUser = users[0];
      console.log(likeUser.avatarPath, likeUser.firstName);
      // handle notification logic here
    }
  }

  async getLikeCount(): Promise<number> {
    return this.LikeModel.countDocuments().exec();

  }
}