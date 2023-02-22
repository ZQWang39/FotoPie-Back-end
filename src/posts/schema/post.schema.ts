import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import {User} from "../../user/schemas/user.schema"

export type PostDocument = HydratedDocument<Posts>;

@Schema({ timestamps: true, versionKey: false })
export class Posts {

_id: mongoose.Schema.Types.ObjectId;

@Prop({ unique: true })
image: {
        original: string,
        large: string,
        small:string
};

@Prop()
image_description: string;

@Prop()
type: string;


@Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
user: User;
}

export const PostSchema = SchemaFactory.createForClass(Posts);