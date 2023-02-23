import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";


export type ImageDocument = HydratedDocument<Image>;

@Schema()
export class Image {


    @Prop()
    path: string;

    @Prop()
    filename: string
    
    // @Prop({})
    // caption:string

    // @Prop({ unique: true })
    // large: string;
    
    // @Prop({ unique: true })
    // small:  string ;



}

export const ImageSchema = SchemaFactory.createForClass(Image);