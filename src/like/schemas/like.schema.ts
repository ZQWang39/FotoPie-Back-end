import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import {User} from "../../user/schemas/user.schema"
import { Posts } from "../../posts/schema/post.schema";

export type LikeDocument = HydratedDocument<Like>;


@Schema({ timestamps: true, versionKey: false })
export class Like {

_id: mongoose.Schema.Types.ObjectId;

@Prop({ required: true })
like_user_email: string;

@Prop({ required: true })
liked_user_email: string;

@Prop({ required: true })
filename: string;

@Prop({ default: false, type: Boolean})
status: boolean;

}
export const LikeSchema = SchemaFactory.createForClass(Like);