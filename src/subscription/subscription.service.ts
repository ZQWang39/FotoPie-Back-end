import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { Model } from "mongoose";
import { Subscription } from "./schemas/subscription.schema";
import { InjectModel } from "@nestjs/mongoose";
import { CreateSubscriptionDto } from "./dto/create-subscription.dto";

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
    // Check if this customer is the first time customer or subscribed before but expired
    try {
      const isSubscribed = await this.subscriptionModel.findOne({
        customer_email,
      });

      // If the customer subscribed before but expired, update the subscription DB document with the latest info
      if (isSubscribed) {
        await this.subscriptionModel.updateOne({
          updatedAt: new Date(),
          customer: createSubscriptionDto.customer,
          payment_status: createSubscriptionDto.payment_status,
          subscription: createSubscriptionDto.subscription,
        });
        // If the customer is the first time customer, create a new DB document
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
    if (!subscription)
      throw new NotFoundException("Customer has not subscribed yet");
    return subscription.customer;
  }

  //check if the user is subscribed
  async isSubscribed(user_email: string): Promise<boolean> {
    const subscription = await this.subscriptionModel.findOne({
      customer_email: user_email,
    });
    if (subscription) {
      const currentTime = new Date();
      const oneMonthAgo = new Date(currentTime);
      oneMonthAgo.setMonth(currentTime.getMonth() - 1);

      if (subscription.updatedAt >= oneMonthAgo) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}
