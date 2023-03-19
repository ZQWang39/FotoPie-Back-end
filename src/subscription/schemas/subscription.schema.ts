import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type SubscriptionDocument = HydratedDocument<Subscription>;

@Schema({ timestamps: true, versionKey: false })
export class Subscription {
  @Prop()
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  customer_email: string;

  @Prop()
  customer: string;

  @Prop()
  payment_status: string;

  @Prop()
  subscription: string;
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);
