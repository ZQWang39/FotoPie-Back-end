import {   IsNotEmpty } from "class-validator";
import { User } from "../../user/schemas/user.schema"

export class PostDTO {
    @ IsNotEmpty()
   
    filename: string;
    email: string;
    

  
    }
