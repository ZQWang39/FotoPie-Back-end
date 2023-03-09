import {
  Controller,
  Query,
  Get,
  Post,
  Body,
  Req,
  Res,
  Headers,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { SubscriptionService } from "./subscription.service";
import { CreateSubscriptionDto } from "./dto/CreateSubscription.dto";
import { Stripe } from "stripe";

const stripe = new Stripe("process.env.STRIPE_SECRET_KEY", {
  apiVersion: "2022-11-15",
});

@Controller("subscription")
export class SubscriptionController {
  constructor(private subscriptionService: SubscriptionService) {}

  @Post("webhook")
  @HttpCode(HttpStatus.OK)
  async handleWebhook(@Body() body: any, @Req() req, @Res() res) {
    // Verify the request signature to ensure it came from Stripe
    const signature = req.headers["stripe-signature"];

    let event = null;
    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.WEBHOOK_SIGNING_SECRET
      );
    } catch (err) {
      //Invalid signature
      res.status(400).end();
    }

    // Handle the event data based on the event type
    let intent = null;
    switch (event["type"]) {
      case "payment_intent.succeeded":
        intent = event.data.object;
        console.log("Payment Successful", intent.id);

        // Add this subscription to the db
        // const subscriptionData = {id: body.id, userEmail: body.email}
        // this.subscriptionService.createSubscription(subscriptionData);
        break;

      case "payment_intent.failed":
        intent = event.data.object;
        const message =
          intent.last_payment_error && intent.last_payment_error.message;
        console.log("Payment Failed:", intent.id, message);
        break;
    }

    // Send a response back to Stripe to acknowledge receipt of the webhook
    res.sendStatus(200);
  }
}
