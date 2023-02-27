import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../user/schemas/user.schema';
import { Posts, PostSchema } from './schema/post.schema';
import { UserPost } from './user-post.controller';
import { UserPostService } from './user-post.service';

@Module({
    
        imports: [
          MongooseModule.forFeature([
            // { name: User.name, schema: UserSchema },
            { name: Posts.name, schema: PostSchema },
          ]),
          // UserModule

          MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
            // { name: Post.name, schema: PostSchema },
          ]),
        ],
        providers: [UserPostService],
        controllers: [UserPost],
      
})

export class UserPostModule{}