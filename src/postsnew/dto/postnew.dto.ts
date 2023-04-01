import { IsNotEmpty, IsString } from "class-validator";
import { Decimal128 } from "mongoose";
import { User } from "../../user/schemas/user.schema";

export class PostnewDTO {
  @IsNotEmpty()
  filename: string;

  @IsString({ each: true }) // add each:true to make sure each item in the array is a string
  tag: string[];

  price: number;
  description: string;
  @IsNotEmpty()
  orginalFilePath: string;
  @IsNotEmpty()
  compressFilePath: string;
}
