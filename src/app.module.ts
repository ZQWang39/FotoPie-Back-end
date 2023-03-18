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
import { EditUserModule } from "./editUser/editUser.module";
import { ResetModule } from "./reset/reset.module";
import { QuickViewModule } from "./quick-view/quick-view.module";
import { LikeModule } from "./like/like.module";
import { CollectModule } from "./collect/collect.module";
import { UserPostModule } from "./user-post/user-post.module";
import { UserCollectionModule } from "./user-collection/user-collection.module";
import { CategoryModule } from "./category/category.module";

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
    EditUserModule,
    ResetModule,
    QuickViewModule,
    LikeModule,
    CollectModule,
    UserCollectionModule,
    UserPostModule,
    CategoryModule
  ],
})
export class AppModule {}
