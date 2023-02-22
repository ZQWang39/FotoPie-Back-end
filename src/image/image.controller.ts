
import { ImageService } from './image.service';
import { HttpStatus } from '@nestjs/common/enums';

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  NotFoundException,
} from "@nestjs/common";
import { Req, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UseInterceptors, UploadedFile } from '@nestjs/common'
import { diskStorage } from 'multer';

import { Observable } from 'rxjs';
import Image from '../image/interface/Image.interface'
import { ImageDTO } from './dto/image.dto';

var path = require('path')

@Controller('image')
export class ImageController {
    constructor(private readonly ImageService: ImageService,
    ) { }




@Post('upload')
@UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
    destination: './files',
        filename: (req, file, callback) => {
        const uniqueSufix =
        Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname);
        const filename = `${uniqueSufix}${ext}`;
        callback(null,`${filename}`)
          
        }
      
    })}))
    uploadSingle(@UploadedFile() file, @Body() body) {
    console.log(file);
    return file
      
    // return this.ImageService.create(ImageDTO);
}


  
@Get(':imagename')
    findImage(@Param('imagename') imagename, @Res() res): Observable<Image>{
      return(res.sendFile(path.join(process.cwd(),'./files/' + imagename)))
    }
     



}
