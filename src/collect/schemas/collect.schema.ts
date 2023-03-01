import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { User } from "../../user/schemas/user.schema";
// import { Posts } from "./post.schema";

export type CollectDocument = HydratedDocument<Collect>; //??

@Schema({ collection: "collect-data", timestamps: true, versionKey: false })
export class Collect {
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "collect_user" })
  collect_user: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "collected_user" })
  collected_user: User;

  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Post" })
  // posts: Posts;

  @Prop()
  type: string;
}

export const CollectSchema = SchemaFactory.createForClass(Collect);
