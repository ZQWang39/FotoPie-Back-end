import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Posts, PostSchema } from './schema/post.schema';
import { MulterModule } from '@nestjs/platform-express/multer';
import { ImageController } from '../image/image.controller';
import { ImageService } from '../image/image.service';
import { UserService } from 'src/user/user.service';
import { UserModule } from "../user/user.module"
import { ImageModule } from '../image/image.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Posts.name, schema: PostSchema }], )
    

   
    ],
  
  controllers: [PostsController,],
  providers: [PostsService, ]
})
export class PostsModule {}
