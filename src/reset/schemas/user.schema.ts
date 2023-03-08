import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema({ collection: "user", timestamps: true, versionKey: false })
export class User {
  @Prop({ required: true })
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  refreshToken: string;

  @Prop({ default: "user", type: String, enum: ["user", "admin"] })
  role: string;

  @Prop({ default: "default_avatar.png", type: String })
  avatar: string;

}

export const UserSchema = SchemaFactory.createForClass(User);
