import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type LikeDocument = HydratedDocument<Like>;

@Schema({ timestamps: true, versionKey: false })
export class Like {
  _id: mongoose.Schema.Types.ObjectId;

  @Prop()
  like_user_email: string;

  @Prop()
  liked_user_email: string;

  @Prop()
  fileName: string;
}
export const LikeSchema = SchemaFactory.createForClass(Like);
