import {   IsNotEmpty } from "class-validator";
import { Decimal128 } from "mongoose";
import { User } from "../../user/schemas/user.schema"

export class PostDTO {
    @ IsNotEmpty()
    filename: string;
    path: string;
    tag: string;
    price:GLfloat


  
    }
