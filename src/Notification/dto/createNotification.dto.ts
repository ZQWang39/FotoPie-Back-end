import { IsNotEmpty, IsString } from 'class-validator';

export class CreateNotificationDto {
  @IsNotEmpty()
  @IsString()
  like_user_email: string;

  @IsNotEmpty()
  @IsString()
  liked_user_email: string;

  @IsNotEmpty()
  @IsString()
  filename: string;
}