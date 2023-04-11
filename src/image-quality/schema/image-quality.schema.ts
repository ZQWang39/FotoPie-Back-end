import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type QualityDocument = HydratedDocument<Quality>;

@Schema({ timestamps: true, versionKey: false })
export class Quality {
  _id: mongoose.Schema.Types.ObjectId;

  //User
  @Prop({ required: true })
  user_email: string; //from guard

  @Prop({ required: true })
  filename: string;

  @Prop({ required: true })
  score: string;
}

export const QualitySchema = SchemaFactory.createForClass(Quality);
