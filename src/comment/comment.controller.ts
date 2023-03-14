import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { CommentService } from './comment.service';
import { Comment } from './schemas/comment.schema';

@Controller('comment')
export class CommentController {
    constructor(private readonly commentService: CommentService){}

    @UseGuards(JwtAuthGuard)
    @Post()
    async createComment(@Body('content') content:string): Promise<Comment>{
        return this.commentService.createComment(content)
    }
    
}
