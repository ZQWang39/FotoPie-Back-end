import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";


export type NotificationDocument = HydratedDocument<Notification>;


@Schema({ timestamps: true, versionKey: false })

export class Notification {

_id: mongoose.Schema.Types.ObjectId;  // The unique identifier for the notification.

@Prop()
like_user_email: string;  

@Prop()
liked_user_email: string;

@Prop()
filename: string;  // The filename of the post that was liked.


}
export const NotificationSchema = SchemaFactory.createForClass(Notification);