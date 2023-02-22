
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




@Controller('posts')
export class PostsController {
  constructor(private readonly PostsService: PostsService,
  ) { }
    



 

}