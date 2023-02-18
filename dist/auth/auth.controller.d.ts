import { AuthService } from './auth.service';
import { LoginUserDto } from './Dto/login-user.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(LoginUserDto: LoginUserDto): Promise<import("./types/tokens.type").Tokens>;
}
