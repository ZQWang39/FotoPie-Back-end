import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true, versionKey: false })
export class User {
  @Prop()
  _id: mongoose.Schema.Types.ObjectId;

  @Prop()
  name: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop()
  refreshToken: string;

  @Prop({ default: "user", type: String, enum: ["user", "admin"] })
  role: string;

  @Prop()
  image: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
