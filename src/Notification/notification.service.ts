import {
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notification, NotificationDocument } from './schemas/notification.schema';


@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notification.name)
    private notificationModel: Model<NotificationDocument>,
  ) {}

  async createNotification(
    notification: Notification,
  ): Promise<NotificationDocument> {
    const createdNotification = new this.notificationModel(notification);
    return createdNotification.save();
  }

  async getAllNotifications(): Promise<NotificationDocument[]> {
    return this.notificationModel.find().exec();
  }

  async getNotificationById(id: string): Promise<NotificationDocument> {
    const notification = await this.notificationModel.findById(id).exec();
    if (!notification) {
      throw new NotFoundException(`Notification with id ${id} not found`);
    }
    return notification;
  }

  async updateNotificationById(
    id: string,
    update: Partial<Notification>,
  ): Promise<NotificationDocument> {
    const notification = await this.getNotificationById(id);
    if (!notification) {
      throw new NotFoundException(`Notification with id ${id} not found`);
    }
    Object.assign(notification, update);
    return notification.save();
  }

  async deleteNotificationById(id: string): Promise<NotificationDocument> {
    const notification = await this.getNotificationById(id);
    if (!notification) {
      throw new NotFoundException(`Notification with id ${id} not found`);
    }
    return notification.remove();
  }
}