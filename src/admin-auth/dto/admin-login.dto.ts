import { IsNotEmpty, IsEmail } from "class-validator";
export class AdminLoginDto {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;
}
