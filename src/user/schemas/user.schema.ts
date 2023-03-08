import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
export type UserDocument = HydratedDocument<User>;

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

  @Prop({
    default: "default_avatar.png",
    type: String,
  })
  avatar: string;

  @Prop({
    default: `https://${process.env.BUCKET_NAME}.s3.${process.env.BUCKET_REGION}.amazonaws.com/default_avatar.png`,
    type: String,
  })
  avatarPath: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
