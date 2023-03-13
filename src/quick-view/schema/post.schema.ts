import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type PostsDocument = HydratedDocument<Posts>;

@Schema({ timestamps: true, versionKey: false })
export class Posts {
  _id: mongoose.Schema.Types.ObjectId;

  @Prop()
  filename: string;

  @Prop()
  tag: string;

  @Prop()
  price: number;

  @Prop()
  userEmail: string;
}

export const PostsSchema = SchemaFactory.createForClass(Posts);