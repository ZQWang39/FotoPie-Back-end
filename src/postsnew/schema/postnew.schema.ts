import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, {
  HydratedDocument,
  NumberExpression,
  ObjectId,
} from "mongoose";
import { User, UserSchema } from "../../user/schemas/user.schema";

export type PostnewDocument = HydratedDocument<Postsnew>;

@Schema({ timestamps: true, versionKey: false })
export class Postsnew {
  _id: mongoose.Schema.Types.ObjectId;

  @Prop()
  filename: string;

  @Prop()
  path: string;

  @Prop({ type: [String] }) // make tag property an array of strings
  tag: string[];

  @Prop()
  price: number;

  @Prop()
  description: string;

  @Prop()
  orginalFilePath: string;

  @Prop()
  compressFilePath: string;

  @Prop()
  userEmail: string;
}

export const PostnewSchema = SchemaFactory.createForClass(Postsnew);
PostnewSchema.index(
  { tag: "text" , description:"text"},
  { default_language: "english", wildcardProjection: { "*": 1 } }
);
