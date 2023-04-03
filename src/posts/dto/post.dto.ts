import {   IsNotEmpty , IsString} from "class-validator";
import { Decimal128 } from "mongoose";
import { User } from "../../user/schemas/user.schema"

export class PostDTO {
  @IsNotEmpty()
  filename: string;

  @IsString({ each: true })
  tag: string[];

  price: number;
  description: string;
  @IsNotEmpty()
  orginalFilePath: string;
  @IsNotEmpty()
  compressFilePath: string;
}
