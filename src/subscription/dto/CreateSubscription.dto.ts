import { IsNotEmpty } from "class-validator";

export class CreateSubscriptionDto {
  @IsNotEmpty()
  readonly customer_email: string;

  readonly customer: string;

  readonly payment_intent: string;

  readonly payment_method_types: string;

  readonly payment_status: string;

  readonly subscription: string;
}
