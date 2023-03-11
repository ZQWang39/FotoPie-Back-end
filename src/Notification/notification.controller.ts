import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { NotificationService } from './notification.service';

@Controller('notifications')
export class NotificationController {
  constructor(private notificationService: NotificationService) {}

  @Post()
  async createNotification(
    @Body('type') type: string,
    @Body('fromUser') fromUser: string,
    @Body('toUser') toUser: string,
    @Body('createdAt') createdAt: Date,
  ) {
    return this.notificationService.createNotification({
      type,
      fromUser,
      toUser,
      createdAt,
    });
  }

  @Put(':id')
  async updateNotification(
    @Param('id') id: string,
    @Body() update: any,
  ) {
    return this.notificationService.updateNotificationById(id, update);
  }

  @Get()
  async getAllNotifications() {
    return this.notificationService.getAllNotifications();
  }

  @Get(':id')
  async getNotificationById(@Param('id') id: string) {
    return this.notificationService.getNotificationById(id);
  }
}