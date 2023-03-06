import {   IsNotEmpty , IsString} from "class-validator";
import { Decimal128 } from "mongoose";
import { User } from "../../user/schemas/user.schema"

export class PostDTO {
   
    filename: string;
  
    path: string;
    @IsString()
    tag: string;
    price: number;
    description: string;
    orginalFilePath: string;
    compressFilePath: string;


  
    }
