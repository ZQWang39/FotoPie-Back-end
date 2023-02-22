import { IsNotEmpty, IsEmail } from "class-validator";
export class ImageDTO {
  @IsNotEmpty()
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    destination: string;
    filename: string;
    path: string;
    size: number
    }
