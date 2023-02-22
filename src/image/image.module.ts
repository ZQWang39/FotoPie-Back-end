import { Module } from '@nestjs/common';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Image, ImageSchema } from './schema/image.schema';
import { MulterModule } from '@nestjs/platform-express/multer';

@Module({
  imports: [
    MongooseModule.forFeature([{ name:  Image.name, schema: ImageSchema }], ),MulterModule.register({ dest: './upload' })
    

   
    ],
  controllers: [ImageController],
  providers: [ImageService]
})
export class ImageModule {}
