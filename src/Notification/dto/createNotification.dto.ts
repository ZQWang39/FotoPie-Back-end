import { IsNotEmpty, IsString } from 'class-validator';

export class CreateNotificationDto {
  @IsNotEmpty()
  @IsString()
  fromUser: string;

  @IsNotEmpty()
  @IsString()
  toUser: string;

  @IsNotEmpty()
  @IsString()
  filename: string;
}