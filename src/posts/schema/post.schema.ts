import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, NumberExpression } from "mongoose";
import { User,UserSchema } from "../../user/schemas/user.schema"


export type PostDocument = HydratedDocument<Posts>;

@Schema({ timestamps: true, versionKey: false })
export class Posts {

_id: mongoose.Schema.Types.ObjectId;
    
@Prop()
filename: string;  

@Prop()
path: string;   

@Prop()
tag: string;
    
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

@Prop({
  type: [{
    content: String,
    commentUser: String,
  }],
  default: []
})
comments:{
  _id: mongoose.Types.ObjectId,
  content: string,
  commentUser: string,
}[]
}


export const PostSchema = SchemaFactory.createForClass(Posts);