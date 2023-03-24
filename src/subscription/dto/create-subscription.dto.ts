import { IsNotEmpty } from "class-validator";

export class CreateSubscriptionDto {
  @IsNotEmpty()
  readonly customer_email: string;

  readonly customer: string;

  readonly payment_status: string;

  readonly subscription: string;
}
