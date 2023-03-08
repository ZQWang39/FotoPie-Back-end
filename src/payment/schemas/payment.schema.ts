import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type PaymentDocument = HydratedDocument<Payment>;

@Schema({ timestamps: true, versionKey: false })
export class Payment {
  @Prop({ required: true })
  _id: mongoose.Schema.Types.ObjectId;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
