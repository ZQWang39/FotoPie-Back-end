import { IsNotEmpty, IsEmail } from "class-validator";
import { User } from "../../user/schemas/user.schema"

export class PostDTO {
    @IsNotEmpty()
    path: string;
    filename: string;
    user_id: User;



  
    }
