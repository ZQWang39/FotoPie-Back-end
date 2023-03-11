import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { AdminModule } from "./admin/admin.module";
import { AdminAuthModule } from "./admin-auth/admin-auth.module";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { EditUserModule } from "./editUser/editUser.module";
import { ResetModule } from "./reset/reset.module";
import { LikeController } from "./like/like.controller";
import { LikeModule } from "./like/like.module";
import { CollectModule } from "./collect/collect.module";
import { NotificationModule } from "./Notification/notification.module";

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URL),
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
    }),
    AdminModule,
    AdminAuthModule,
    UserModule,
    AuthModule,
    EditUserModule,
    ResetModule,
    LikeModule,
    CollectModule,
    NotificationModule,
  ],
})
export class AppModule {}
