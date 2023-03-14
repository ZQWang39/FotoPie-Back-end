import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { User } from "src/user/schemas/user.schema";
export type CommentDocument = HydratedDocument<Comment>;

@Schema({timestamps: true, versionKey: false})
export class Comment {
    _id: mongoose.Schema.Types.ObjectId;

    @Prop({required:true})
    content:string;

    @Prop({required:true})
    filename:string;

    @Prop({required:true})
    commentUser:User;

    @Prop()
    replyUser:User;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);