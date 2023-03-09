import { IsNotEmpty } from "class-validator";

export class CreateSubscriptionDto {
  @IsNotEmpty()
  readonly id: string

  @IsNotEmpty()
  readonly userEmail: string
}
