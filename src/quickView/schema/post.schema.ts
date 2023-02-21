import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema({ collection: "post-data", timestamps: true, versionKey: false })
export class Post {
  @Prop()
  _id: mongoose.Schema.Types.ObjectId;

  @Prop()
  user_id: string;

  @Prop()
  photo: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
