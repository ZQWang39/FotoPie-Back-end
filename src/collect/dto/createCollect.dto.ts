import { IsNotEmpty, IsString } from "class-validator";

//frontend sent to backend
export class CreateCollectDto {
  @IsNotEmpty()
  // @IsString()
  readonly filename: string;
}
