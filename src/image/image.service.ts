import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Image, ImageDocument } from './schema/image.schema';
import { Model } from 'mongoose';
import { ImageDTO } from './dto/image.dto';

@Injectable()
export class ImageService {

    constructor(
        @InjectModel(Image.name) private readonly imageModel: Model<ImageDocument>,
    ) {}


    public async createImage(ImageDTO) {
      
        const image = await this.imageModel.create(ImageDTO)
        return image
      }


}
