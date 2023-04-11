import { IsNotEmpty, IsString } from "class-validator";

export class ImageQualityDto {
  @IsNotEmpty()
  @IsString()
  readonly user_email: string;

  @IsNotEmpty()
  @IsString()
  readonly filename: string;

  @IsNotEmpty()
  @IsString()
  readonly score: string;
}
