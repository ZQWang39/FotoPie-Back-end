import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { User } from "../../user/schemas/user.schema";
import { Image, ImageSchema } from "./image.schema";

export type PostDocument = HydratedDocument<Posts>;

@Schema({ timestamps: true, versionKey: false })
export class Posts {
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true, type: ImageSchema })
  image: Image;

  @Prop()
  type: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
  user: User;
}

export const PostSchema = SchemaFactory.createForClass(Posts);
