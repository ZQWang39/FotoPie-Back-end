import { IsNotEmpty, IsString } from "class-validator";

export class UserCollectDto {
  @IsNotEmpty()
  @IsString()
  readonly collect_user_email: string;

  @IsNotEmpty()
  @IsString()
  readonly collected_user_email: string;

  @IsNotEmpty()
  @IsString()
  readonly filename: string;
}
