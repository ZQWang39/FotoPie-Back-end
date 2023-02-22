
import { ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common'
import { Posts, PostDocument } from './schema/post.schema';
@Injectable()
export class PostsService {

    constructor(
        @InjectModel(Posts.name) private readonly postModel: Model<PostDocument>,
    ) { }








    
}
