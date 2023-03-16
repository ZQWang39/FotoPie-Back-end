import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notification, NotificationDocument } from './schemas/notification.schema';
import { CreateNotificationDto } from './dto/createNotification.dto';
import { User, UserDocument } from "../user/schemas/user.schema";
import { Posts, PostDocument } from 'src/like/schemas/post.schema';
import { LikeService } from 'src/like/like.service';
import { UserLikeDto } from 'src/like/Dto/UserLike.dto';
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



  // async getNewLikes(since: Date): Promise<Like[]> {
  //   return this.LikeModel
  //     .find({ createdAt: { $gte: since } })
  //     .sort({ createdAt: -1 })
  //     .exec();
  // }

  // async getNotifications(): Promise<{ userAvatar: string; userFirstName: string; postLiked: string }[]> {
  //   const notifications = await this.notificationModel.find().exec();
  //   const users = await this.userModel.find().exec();

  //   const userIdToUserMap = users.reduce<{ [userId: string]: UserDocument }>((acc, user) => {
  //     acc[user._id.toString()] = user;
  //     return acc;
  //   }, {});


  //   return notifications.map(({ fromUser, filename }) => ({
  //     userAvatar: userIdToUserMap[fromUser.toString()].avatar,
  //     userFirstName: userIdToUserMap[fromUser.toString()].firstName,
  //     postLiked: filename,
  //   }));
  // }

  // async create(createNotificationDto: CreateNotificationDto): Promise<Notification> {
  //   const newNotification = new this.notificationModel(createNotificationDto);
  //   return this.notificationModel.create(newNotification);
  // }

  // async getNotificationCount(): Promise<number> {
  //   const count = await this.notificationModel.countDocuments();
  //   return count;
  // }

  // async createLikeNotification(userLikeDto: UserLikeDto): Promise<Notification> {
  //   const email = await this.likeService.findEmailByFilename(userLikeDto);
  //   const user = await this.userModel.findOne({ email }).exec();

  //   const createNotificationDto: CreateNotificationDto = {
  //     fromUser: user._id,
  //     toUser: user._id,
  //     filename: userLikeDto.filename,
  //   };

  //   const newNotification = new this.notificationModel(createNotificationDto);
  //   return this.notificationModel.create(newNotification);
  // }

}