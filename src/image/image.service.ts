import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Image, ImageDocument } from './schema/image.schema';
import { Model } from 'mongoose';
import { ImageDTO } from './dto/image.dto';

@Injectable()
export class ImageService {

    constructor(
        @InjectModel(Image.name) private readonly imageModel: Model<ImageDocument>,
    ) { }

    create(ImageDTO: ImageDTO) {
        return "This action adds a new user";
      }

}
