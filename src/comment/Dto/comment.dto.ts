import { IsNotEmpty } from "class-validator";

export class CommentDto{
    @IsNotEmpty()
    readonly content: string;

    @IsNotEmpty()
    readonly fileName: string;
}