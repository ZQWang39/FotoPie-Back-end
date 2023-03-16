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
  HttpException,
} from "@nestjs/common";
import { SubscriptionService } from "./subscription.service";
import { CreateSubscriptionDto } from "./dto/CreateSubscription.dto";
import { Stripe } from "stripe";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guards";
import { UseGuards } from "@nestjs/common/decorators";
import * as fs from "fs";

// const stripe = new Stripe("process.env.STRIPE_TEST_MODE_API_KEY", {
//   apiVersion: "2022-11-15",
// });

@Controller("subscription")
export class SubscriptionController {
  private readonly stripe: Stripe;

  constructor(private subscriptionService: SubscriptionService) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2022-11-15",
    });
  }

  // @UseGuards(JwtAuthGuard)
  @Post("create-checkout-session")
  @HttpCode(HttpStatus.OK)
  async createSubscription(@Req() req, @Res() res) {
    // const user_email = req.user['email']
    // console.log(user_email)

    const priceId = "price_1MitMoCWJBDJNhy8OQeBC2pY";

    // Create a new checkout session
    try {
      const session = await this.stripe.checkout.sessions.create({
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        currency: "AUD",
        // customer_email: user_email,
        mode: "subscription",
        success_url: "http://localhost:3000/subscription/success",
        cancel_url: "http://localhost:3000/subscription/cancel",
      });

      // redirect frontend page to the stripe pre-build checkout page
      res.json({ session_url: session.url });
    } catch (e) {
      res.status(400);
      return res.send({
        error: {
          message: e.message,
        },
      });
    }
  }

  // @UseGuards(JwtAuthGuard)
  @Post("create-portal-session")
  @HttpCode(HttpStatus.OK)
  async createCustomerPortal(
    @Body() body: { sessionId: string },
    @Req() req,
    @Res() res
  ) {
    const { sessionId } = body;
    const checkoutSession = await this.stripe.checkout.sessions.retrieve(
      sessionId
    );

    const returnUrl = "http://localhost:3000";

    const portalSession = await this.stripe.billingPortal.sessions.create({
      customer: checkoutSession.customer as string,
      return_url: returnUrl,
    });

    res.json({ portalSession_url: portalSession.url });
  }

  @Post("webhook")
  @HttpCode(HttpStatus.OK)
  async handleWebhook(@Body() body: string | Buffer, @Req() req, @Res() res) {
    // Verify the request signature to ensure it came from Stripe
    const signature = req.headers["stripe-signature"];
    console.log(signature);
    console.log(req.headers);
    // console.log(body);

    const webhook_secret = process.env.WEBHOOK_SIGNING_SECRET;
    console.log(webhook_secret);

    let event;
    try {
      event = this.stripe.webhooks.constructEvent(
        body,
        signature,
        webhook_secret
      );
    } catch (err) {
      //Invalid signature or body or webhook_secret
      console.log("Webhook signature verification failed");
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // Handle the event data based on the event type
    let intent = null;
    switch (event.type) {
      case "checkout.session.completed":
        intent = event.data.object;
        console.log("Payment Successful", intent.id);
      // Add this subscription to the db
      // const subscriptionData = {id: body.id, userEmail: body.email}
      // this.subscriptionService.createSubscription(subscriptionData);

      case "invoice.paid":
        intent = event.data.object;
        console.log("Payment Successful", intent.id);
        break;

      case "invoice.payment_failed":
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
