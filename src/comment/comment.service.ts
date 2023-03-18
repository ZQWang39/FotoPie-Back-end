import { Injectable, Req } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Query } from "express-serve-static-core";
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

    async findAllComment(query:Query,filename):Promise<CommentDocument[]>{
        const resPerPage = Number(query.limit);
        const currentPage = Number(query.page) || 1
        const skip = resPerPage * (currentPage-1);

        const paginatedImage = this.commentModel
            .find(filename)
            .sort({createdAt:"desc"})
            .limit(resPerPage)
            .skip(skip)
        
        console.log(paginatedImage)

        return this.commentModel.find(paginatedImage)
    }
}
