import { ServeStaticModule } from "@nestjs/serve-static";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { AdminModule } from "./admin/admin.module";
import { AdminAuthModule } from "./admin-auth/admin-auth.module";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { EditUserModule } from "./editUser/editUser.module";
import { join } from "path";
import { ResetModule } from "./reset/reset.module";

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URL),
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "public"),
      exclude: ["/api*"],
    }),
    AdminModule,
    AdminAuthModule,
    UserModule,
    AuthModule,
    EditUserModule,
    ResetModule,
  ],
})
export class AppModule {}
