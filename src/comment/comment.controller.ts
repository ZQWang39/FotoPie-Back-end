import { Controller, Post, UseGuards, Body, Delete, Param, Get, Query } from '@nestjs/common';
import { query } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { CommentService } from './comment.service';
import { CommentDto } from './Dto/comment.dto';
import { Comment } from './schemas/comment.schema';
import { Query as ExpressQuery } from "express-serve-static-core"

@Controller('comment')
export class CommentController {
    constructor(private readonly commentService: CommentService){}

    @UseGuards(JwtAuthGuard)
    @Post()
    async createComment(@Body() content:CommentDto): Promise<Comment>{
        return this.commentService.createComment(content, Body)
    }
    
    @Delete()
    async deleteComment(@Param() comment ){
        return this.commentService.deleteComment(comment)
    }

    @Get()
    findAllComment(@Query() query:ExpressQuery,filename){
        return this.commentService.findAllComment(query,filename)
    }

    
}
