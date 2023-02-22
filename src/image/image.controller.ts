
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
import { ConfigModule } from '@nestjs/config';

import { Observable } from 'rxjs';
import Image from '../image/interface/Image.interface'
import { ImageDTO } from './dto/image.dto';
import { Request } from "express"

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
        const uniqueSufix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname);
        const filename = `${uniqueSufix}${ext}`;
        callback(null,`${filename}`)
          
        }
      
    })}))
    async upload(@UploadedFile() file:Express.Multer.File, @Req() req: any) {
    console.log(file);
   
    return this.ImageService.createImage(file)
      
    // return file
}
    




  
@Get(':imagename')
    findImage(@Param('imagename') imagename, @Res() res): Observable<Image>{
      return(res.sendFile(path.join(process.cwd(),'./files/' + imagename)))
    }
     



}
