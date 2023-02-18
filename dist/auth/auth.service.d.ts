import { User, UserDocument } from './schema/auth.schemas';
import { Model } from 'mongoose';
import { LoginUserDto } from './Dto/login-user.dto';
import { JwtService } from "@nestjs/jwt";
import { Tokens } from "./types/tokens.type";
export declare class AuthService {
    private jwtService;
    private readonly userModel;
    constructor(jwtService: JwtService, userModel: Model<UserDocument>);
    findByEmail(email: string): Promise<User>;
    login({ email, password }: LoginUserDto): Promise<Tokens>;
    getTokens(email: string): Promise<[string]>;
}
