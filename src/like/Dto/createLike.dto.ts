import { IsNotEmpty, IsString } from "class-validator";

export class CreateLikeDto {
    @IsNotEmpty()
    @IsString()
    readonly like_user_ld: string;

    @IsNotEmpty()
    @IsString()
    readonly liked_user_ld: string;

    @IsNotEmpty()
    @IsString()
    readonly post_ld: string;



}