
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
import { FileInterceptor } from '@nestjs/platform-express';
import { UseInterceptors, UploadedFile } from '@nestjs/common'


@Controller('posts')
export class PostsController {
    constructor(private readonly PostsService: PostsService,
    ) { }
    



          
    
 
@Post('upload')
@UseInterceptors(FileInterceptor('file'))
uploadFile(@UploadedFile() file: Express.Multer.File) {
  console.log(file);
}
    // @Post('/file')
    // handleUpload() {
    //     return 'FIle'
    // }


}
