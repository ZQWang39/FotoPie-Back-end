import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "../user/schemas/user.schema";
import { Collect, CollectSchema } from "./schema/collect.schema";
import { UserCollection } from "./user-collection.controller";
import { UserCollectionService } from "./user-collection.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      // { name: User.name, schema: UserSchema },
      { name: Collect.name, schema: CollectSchema },
    ]),
    // UserModule

    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      // { name: Post.name, schema: PostSchema },
    ]),
  ],
  providers: [UserCollectionService],
  controllers: [UserCollection],
})
export class UserPostModule {}
