import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type CollectDocument = HydratedDocument<Collect>;

@Schema({ timestamps: true, versionKey: false })
export class Collect {
  _id: mongoose.Schema.Types.ObjectId;

  //User A
  @Prop()
  collect_user_email: string; //from guard

  //User B
  @Prop()
  collected_user_email: string; //from post.userEmail

  //User B posts
  @Prop()
  filename: string; //from front end
}

export const CollectSchema = SchemaFactory.createForClass(Collect);
