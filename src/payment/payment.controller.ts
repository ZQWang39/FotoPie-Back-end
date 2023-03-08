import {
  Controller,
  Query,
  Get,
  Post,
  Body,
  Headers,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { PaymentService } from "./payment.service";
import { Stripe } from "stripe";

const stripe = new Stripe("process.env.STRIPE_SECRET_KEY", {
  apiVersion: "2022-11-15",
});
const endPointSecretKey = process.env.ENDPOINT_SECRET_KEY;

@Controller("Payment")
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Get()
  checkout() {
    return this.paymentService.checkout();
  }
}
