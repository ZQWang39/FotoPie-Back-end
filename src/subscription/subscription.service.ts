import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Model } from "mongoose";
import { Subscription } from "./schemas/subscription.schema";
import { InjectModel } from "@nestjs/mongoose";
import { CreateSubscriptionDto } from "./dto/CreateSubscription.dto";

@Injectable({})
export class SubscriptionService {
  constructor(
    @InjectModel(Subscription.name)
    private readonly subscriptionModel: Model<Subscription>
  ) {}

  async createSubscription(
    createSubscriptionDto: CreateSubscriptionDto
  ): Promise<CreateSubscriptionDto> {
    const customer_email = createSubscriptionDto.customer_email;
    try {
      const isSubscribed = await this.subscriptionModel.findOne({
        customer_email,
      });

      if (isSubscribed) {
        await this.subscriptionModel.updateOne({
          updatedAt: new Date(),
          customer: createSubscriptionDto.customer,
          payment_intent: createSubscriptionDto.payment_intent,
          payment_method_types: createSubscriptionDto.payment_method_types,
          payment_status: createSubscriptionDto.payment_status,
          subscription: createSubscriptionDto.subscription,
        });
      } else {
        const newSubscription = new this.subscriptionModel(
          createSubscriptionDto
        );
        return newSubscription.save();
      }
    } catch (error) {
      throw new UnauthorizedException("Creating New Subscription in DB Failed");
    }
  }

  async findCustomerByEmail(user_email: string): Promise<string> {
    const subscription = await this.subscriptionModel.findOne({ user_email });
    const customer = subscription.customer;
    return customer;
  }
}
