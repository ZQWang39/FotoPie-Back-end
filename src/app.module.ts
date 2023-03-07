import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { AdminModule } from "./admin/admin.module";
import { AdminAuthModule } from "./admin-auth/admin-auth.module";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { PostsModule } from "./posts/posts.module";
import { config } from "./config/config";
import { mongoConfig } from "./config/mongoConfig";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useClass: mongoConfig,
    }),
    AdminModule,
    AdminAuthModule,
    UserModule,
    AuthModule,
    PostsModule,
  ],
})
export class AppModule {}
