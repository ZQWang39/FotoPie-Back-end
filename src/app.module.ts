import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CatsModule } from "./cats/cats.module";
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGO_URL), CatsModule, UserModule, AuthModule],
})
export class AppModule {}
