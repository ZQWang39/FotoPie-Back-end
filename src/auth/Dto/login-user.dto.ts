import { IsNotEmpty, IsEmail } from "class-validator";

export class LoginUserDto {
  @IsNotEmpty()
  @IsEmail()
  public email: string;
  


  @IsNotEmpty()
   public password: string;
}