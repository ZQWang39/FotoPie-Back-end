import { IsMongoId, IsNotEmpty } from "class-validator";
import mongoose, { ObjectId } from "mongoose";

export class CommentDto{
    @IsNotEmpty()
    readonly content: string;

    @IsNotEmpty()
    readonly fileName: string;

    // @IsMongoId()
    readonly _id: mongoose.Types.ObjectId;
}