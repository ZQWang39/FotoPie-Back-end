import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Posts, PostSchema } from './schema/post.schema';
import { MulterModule } from '@nestjs/platform-express/multer';


import { UserService } from 'src/user/user.service';
import { UserModule } from "../user/user.module"


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Posts.name, schema: PostSchema }]),  MulterModule.register({ dest: './upload' })
    

   
    ],
  
  controllers: [PostsController,],
  providers: [PostsService, ]
})
export class PostsModule {}
