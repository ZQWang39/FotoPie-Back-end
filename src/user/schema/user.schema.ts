import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
}

@Schema({
  timestamps: true,
})
export class User {
  @Prop()
  _id: mongoose.Schema.Types.ObjectId;

  @Prop()
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  refreshToken: string;

  role: Role;
}


export const UserSchema = SchemaFactory.createForClass(User);
