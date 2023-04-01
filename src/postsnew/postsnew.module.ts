import { Module } from "@nestjs/common";
import { PostsnewController } from "./postsnew.controller";
import { PostsnewService } from "./postsnew.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Postsnew, PostnewSchema } from "./schema/postnew.schema";
import { MulterModule } from "@nestjs/platform-express/multer";

import { UserModule } from "../user/user.module";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Postsnew.name, schema: PostnewSchema }]),
    MulterModule.register({ dest: "./upload" }),
    UserModule,
    AuthModule,
  ],

  controllers: [PostsnewController],
  providers: [PostsnewService],
})
export class PostsnewModule {}
