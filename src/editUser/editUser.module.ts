import { ServeStaticModule } from "@nestjs/serve-static";
import { UserModule } from "src/user/user.module";
import { EditUserController } from "./editUser.controller";
import { EditUserService } from "./editUser.service";
import { Module } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/user/schemas/user.schema";
import { join } from "path";
// import { JwtModule } from "@nestjs/jwt";
// import { MongooseModule } from "@nestjs/mongoose";
// import { User, UserSchema } from "src/user/schemas/user.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [EditUserController],
  providers: [EditUserService],
})
export class EditUserModule {}
