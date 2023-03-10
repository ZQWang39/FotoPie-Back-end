import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";


export type ImageDocument = HydratedDocument<Image>;

@Schema({ timestamps: true, versionKey: false })
export class Image {

    @Prop({ unique: true })
    original: string ;

    @Prop({ unique: true })
    large: string;
    
    @Prop({ unique: true })
    small:  string ;



}

export const ImageSchema = SchemaFactory.createForClass(Image);