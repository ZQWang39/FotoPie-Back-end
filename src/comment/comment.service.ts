import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment, CommentDocument } from './schemas/comment.schema';

@Injectable()
export class CommentService {
    constructor(
        @InjectModel("Comment") private readonly commentModel: Model<CommentDocument>,
    ){}
    
    async createComment(content:string):Promise<Comment>{
        const comment = new Comment();
        comment.content = content;
        return this.commentModel.create(comment)
    }

    async deleteComment(_id:string):Promise<void>{
        await this.commentModel.deleteOne({_id});
    }

}
