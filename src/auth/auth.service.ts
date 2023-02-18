import { Injectable, NotFoundException, ForbiddenException, Body} from '@nestjs/common';
import { User, UserDocument } from './schema/auth.schemas';
import { Model } from 'mongoose';
import { LoginUserDto } from './Dto/login-user.dto';
import * as bcrypt from "bcryptjs";
import { InjectModel } from '@nestjs/mongoose';
import { role } from './schema/role.enums';
import { JwtService } from "@nestjs/jwt";
import { Tokens } from "./types/tokens.type";
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class AuthService {
    constructor(  private jwtService: JwtService,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>){}
    

    async findByEmail(email: string): Promise<User>{
        const user = await this.userModel.findOne({ email });
        if(!user)
        throw new NotFoundException()
        return user
    }
    async login({email, password}: LoginUserDto): Promise<Tokens> { 
        const user = await this.findByEmail(email)
        if(!user){
            throw new NotFoundException()
        }
    
        //区分登陆的User还是Admin
        // const adminRole = (role.Admin, user.role)
        if(role.Admin !== user.role){
            throw new NotFoundException()
        }
        // const passwordMatch = password;
        if(password !== user.password){
            throw new ForbiddenException
        }
        const tokens:any= await this.getTokens(email)
        return tokens;
        
       
    }
    async getTokens(email:string){
        const at = await Promise.all([
            this.jwtService.signAsync(
                {email,},
                {
                    secret: process.env.Secret,
                    expiresIn: "2d",
                }
            ),
        ])
        return at
        
    }
    
}

