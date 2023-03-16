import { IsNotEmpty, IsString } from 'class-validator';

export class CreateNotificationDto {
  @IsNotEmpty()
  // @IsString()
  fromUser: object;

  @IsNotEmpty()
  @IsString()
  toUser: string;

  @IsNotEmpty()
  // @IsString()
  filename: object;
}