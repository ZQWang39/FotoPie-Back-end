import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, NumberExpression, ObjectId } from "mongoose";
import { User, UserSchema } from "../../user/schemas/user.schema"
import textSearch from "mongoose-text-search";



export type PostDocument = HydratedDocument<Posts>;

@Schema({ timestamps: true, versionKey: false })
export class Posts {
  _id: mongoose.Schema.Types.ObjectId;

  @Prop()
  filename: string;

  @Prop()
  path: string;

  @Prop({ type: [String] })
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

  // @Prop()
  // comment:{
  //     _id: mongoose.Schema.Types.ObjectId;
  //     content: string;
  //     commentUser:string;
  // }
}

export const PostSchema = SchemaFactory.createForClass(Posts);



PostSchema.index(
  {
    tag: "text",
    description: "text",
  },
  {
    default_language: "english",
    weights: {
      tag: 1,
      description: 2,
    },
    wildcardProjection: { "*": 1 },
  },
  
);


