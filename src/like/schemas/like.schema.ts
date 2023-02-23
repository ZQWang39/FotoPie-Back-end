import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import {User} from "../../user/schemas/user.schema"
import { Posts } from "./post.schema";

export type LikeDocument = HydratedDocument<Like>;


@Schema({ timestamps: true, versionKey: false })
export class Like {

_id: mongoose.Schema.Types.ObjectId;

@Prop()
like_user: string;

@Prop()
liked_user: string;

@Prop()
posts: string;

// @Prop({type:Date})
// updatedAt: Date;

}
export const LikeSchema = SchemaFactory.createForClass(Like);