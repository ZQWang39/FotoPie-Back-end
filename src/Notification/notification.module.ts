import { Module } from "@nestjs/common";
import { NotificationService } from "./notification.service";
import { NotificationController } from "./notification.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtModule } from '@nestjs/jwt';
import { Notification, NotificationSchema } from './schemas/notification.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { 
        name: Notification.name, 
        schema: NotificationSchema,
      }
    ]),
    JwtModule.register({}),
  ],
  controllers: [NotificationController],
  providers: [NotificationService],
  exports: [NotificationService],

})
export class NotificationModule {}