import { Injectable, Req } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommentDto } from './Dto/comment.dto';
import { Comment, CommentDocument } from './schemas/comment.schema';


@Injectable()
export class CommentService {
    constructor(
        @InjectModel("Comment") private readonly commentModel: Model<CommentDocument>,
    ){}
    
    async createComment(contentData:CommentDto, @Req() req: any):Promise<Comment>{
        const comment = new Comment();
        comment.content = contentData.content;
        comment.filename = contentData.fileName
        comment.commentUser = req.user["firstName"]
        return this.commentModel.create(comment)
    }

    async deleteComment(_id:string):Promise<void>{
        await this.commentModel.deleteOne({_id});
    }

    async findAllComment(fileName){
        return this.commentModel.find(fileName)
    }
}
