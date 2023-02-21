import { IsString, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    readonly firstName: string;
    readonly lastName: string;
    readonly password: string;
    readonly email: string;
}
  
export default CreateUserDto;
  
