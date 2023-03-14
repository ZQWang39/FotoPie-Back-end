import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import {User} from "../../user/schemas/user.schema"
import { Posts } from "./post.schema";

export type LikeDocument = HydratedDocument<Like>;


@Schema({ timestamps: true, versionKey: false })
export class Like {

_id: mongoose.Schema.Types.ObjectId;

@Prop()
like_user_email: string;

@Prop()
liked_user_email: string;

@Prop()
filename: string;

// @Prop({type:Date})
// updatedAt: Date;

}
export const LikeSchema = SchemaFactory.createForClass(Like);