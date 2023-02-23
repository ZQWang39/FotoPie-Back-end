
import { HttpStatus } from '@nestjs/common/enums';
import { Posts } from './schema/post.schema';
import {PostsService } from './posts.service';
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
import { PostDTO } from './dto/post.dto';
import { Observable } from 'rxjs';

import Image from '../image/interface/Image.interface'
import { ImageDTO } from './dto/image.dto';
import { Request } from "express"
import { v4 as uuidv4 } from 'uuid';

import { FileInterceptor } from '@nestjs/platform-express';
import { UseInterceptors, UploadedFile } from '@nestjs/common'
import { diskStorage } from 'multer';

var path = require('path')



@Controller('posts')
export class PostsController {
  constructor(private readonly PostsService: PostsService,
  ) { }
    
  // @Post()
  // create(@Body() PostDTO: PostDTO, @Req() req:any): Observable<PostDTO>{
  //   const user = req.user.user
  //   return this.PostsService.create(user, PostDTO)
  // }
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
      // limits: {
      // fileSize: +process.env.MAX_FILE_SIZE,
      
      // },
  fileFilter: (req: any, file: any, cb: any) => {
          if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
              // Allow storage of file
              cb(null, true);
          } else {
              // Reject file
              cb(new HttpException(`Unsupported file type ${path.extname(file.originalname)}`, HttpStatus.BAD_REQUEST), false);
          }
      },
  storage: diskStorage({
  destination: './files',
      filename: (req, file, callback) => {
      const uniqueSufix = uuidv4();
      // const uniqueSufix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const ext = path.extname(file.originalname);
      const filename = `${uniqueSufix}${ext}`;
      callback(null,`${filename}`)
        
      }
    
  })}))
  async upload(@UploadedFile() file, @Res() res): Promise<Image>{
    console.log(file);
    
  return res.status(HttpStatus.OK).json({
    message: "Confirmed ",
    filename: file.filename,
  })
}

@Get(':imagename')
findImage(@Param('imagename') imagename, @Res() res): Observable<Image>{
  return(res.sendFile(path.join(process.cwd(),'./files/' + imagename)))
}
  
  
  
// @guard
// @Post('/upload/sent') 
  
  
  
 

}