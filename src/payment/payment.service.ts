import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { Model } from "mongoose";
import { Payment } from "./schemas/payment.schema";
import { InjectModel } from "@nestjs/mongoose";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

@Injectable({})
export class PaymentService {
  constructor(
    @InjectModel(Payment.name) private paymentModel: Model<Payment>
  ) {}

  async checkout() {
    return;
  }
}
