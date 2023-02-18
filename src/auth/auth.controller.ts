import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService} from './auth.service';
import { LoginUserDto } from './Dto/login-user.dto';
import { User } from './schema/auth.schemas';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('login')
    @HttpCode(HttpStatus.OK)
    login(@Body() LoginUserDto: LoginUserDto)
    {return this.authService.login(LoginUserDto)}

    
}

