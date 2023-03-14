import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  ConflictException,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { Model } from "mongoose";
import { Subscription } from "./schemas/subscription.schema";
import { InjectModel } from "@nestjs/mongoose";
import { CreateSubscriptionDto } from "./dto/CreateSubscription.dto";
import { Stripe } from "stripe";

@Injectable({})
export class SubscriptionService {
  constructor(
    @InjectModel(Subscription.name)
    private readonly subscriptionModel: Model<Subscription>
  ) {}

  async createSubscription(
    createSubscriptionDto: CreateSubscriptionDto
  ): Promise<object> {
    const email = createSubscriptionDto.userEmail;
    if (await this.subscriptionModel.findOne({ email })) {
      throw new ConflictException("Already Subscribed");
    } else {
      try {
        const newSubscription = new this.subscriptionModel(
          createSubscriptionDto
        );
        return newSubscription.save();
      } catch (error) {
        throw new UnauthorizedException(
          "Creating New Subscripton in DB Failed"
        );
      }
    }
  }
}
