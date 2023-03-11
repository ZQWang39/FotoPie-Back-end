import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from "mongoose";

export type NotificationDocument = HydratedDocument<Notification>;

@Schema()
export class Notification {
  @Prop()
  type: string;

  @Prop()
  fromUser: string;

  @Prop()
  toUser: string;

  @Prop({default: Date.now() })
  createdAt: Date;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);