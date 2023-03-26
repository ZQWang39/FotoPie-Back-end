import { IsMongoId, IsNotEmpty } from "class-validator";
import { ObjectId } from "mongoose";

export class CommentDto{
    @IsNotEmpty()
    readonly content: string;

    @IsNotEmpty()
    readonly fileName: string;

    // @IsMongoId()
    readonly contentId: ObjectId ;
}