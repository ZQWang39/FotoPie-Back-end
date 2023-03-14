import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { User } from "src/user/schemas/user.schema";


export type NotificationDocument = HydratedDocument<Notification>;


@Schema({ timestamps: true, versionKey: false })

export class Notification {

_id: mongoose.Schema.Types.ObjectId;  // The unique identifier for the notification.

@Prop()
fromUser: User;  

@Prop()
toUser: string;

@Prop()
filename: string;  // The filename of the post that was liked.


}
export const NotificationSchema = SchemaFactory.createForClass(Notification);