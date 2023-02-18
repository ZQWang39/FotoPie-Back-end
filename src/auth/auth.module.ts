import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/auth.schemas';
import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { AtStrategy } from './strategy/as.strategy';

dotenv.config();

@Module({
  providers: [AuthService, JwtService, AtStrategy],
  imports:[ MongooseModule.forFeature([{name:User.name, schema: UserSchema}]),
            JwtModule.register({
              secret: process.env.ACCESS_TOKEN_SECRET_PRIVATE
            })],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
