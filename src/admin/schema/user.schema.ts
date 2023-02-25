import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";

export type UserDocument = User & Document;

@Schema({ timestamps: true, versionKey: false })
export class User {
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop()
  refreshToken: string;

  @Prop({ default: "user", type: String, enum: ["user", "admin"] })
  role: string;

  @Prop({ default: "default.jpg" })
  avatar: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
