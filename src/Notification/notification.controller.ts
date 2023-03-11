import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/createNotification.dto';

@Controller('notification')
@UseGuards(JwtAuthGuard)
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}


  // "find all" is used to retrieve existing data
  @Get()
  async findAll() {
    return this.notificationService.findAll();
  }

  // "create notification" is used to create new data in response to events or actions.
  @Post("new")
  async create(@Body() createNotificationDto: CreateNotificationDto) {
    const notification = await this.notificationService.create(createNotificationDto);
    const count = await this.notificationService.getNotificationCount();
    return { notification, count };
  }


}