import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notification, NotificationDocument } from './schemas/notification.schema';
import { CreateNotificationDto } from './dto/createNotification.dto';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notification.name)
    private notificationModel: Model<NotificationDocument>,
  ) {}

  // async findAll(): Promise<Notification[]> {
  //   return this.notificationModel.find().exec();
  // }

  async create(createNotificationDto: CreateNotificationDto): Promise<Notification> {
    const newNotification = new this.notificationModel(createNotificationDto);
    return this.notificationModel.create(newNotification);
  }

  async getNotificationCount(): Promise<number> {
    const count = await this.notificationModel.countDocuments();
    return count;
  }
}