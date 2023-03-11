import { IsEmail, IsNotEmpty } from "class-validator";

export class ResetRequestDto {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;
}
