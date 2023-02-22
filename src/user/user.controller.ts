import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,Res
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guards";
import { Request } from "express";
import { User } from './schemas/user.schema';

import { HttpStatus } from '@nestjs/common/enums';
import { JwtService } from '@nestjs/jwt';
import { ConfirmEmailDto } from './dto/confirmEmail.dto'
import { FileInterceptor } from '@nestjs/platform-express';
import { UseInterceptors, UploadedFile } from '@nestjs/common'
import { diskStorage } from 'multer';
import { Observable } from "rxjs";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return null;
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.userService.remove(+id);
  }

  // @UseGuards(JwtAuthGuard)
  // @Get("/me")
  // me(@Req() req: Request) {
  //   const userEmail = req.user["email"];
  //   return this.userService.findByEmail(userEmail);
  // }


  // send email
  @Post('/create')
  async addUser(@Res() res, @Body() createUserDTO: CreateUserDto): Promise<User> {
    if (await this.userService.doesUserExists(createUserDTO)) {
      return res.status(HttpStatus.CONFLICT).json({
        message: "User already exists"
      })
    }
    await this.userService.sendVerificationLink(createUserDTO.email, createUserDTO.firstName, createUserDTO.lastName, createUserDTO.password);
    return res.status(HttpStatus.OK).json({
      message: "Email has been sent, kindly activate your account "
    });
  }


  //create user 
  @Post('/signup')

  async register(@Res() res, @Body() ConfirmEmailDto: ConfirmEmailDto): Promise<User> {
    
    await this.userService.decodeConfirmationToken(ConfirmEmailDto.token);

      return res.status(HttpStatus.CREATED).json({
        message: "Confirmed "
      })
  
  
  }
  

  // @Post('upload')
  // @UseInterceptors(FileInterceptor('file', {
  //   storage: diskStorage({
  //     destination: './files',
  //     filename: (req, file, callback) => {
  //       const uniqueSufix =
  //         Date.now() + '-' + Math.round(Math.random() * 1e9);
  //       var path = require('path')
  //       const ext = path.extname(file.originalname);
  //       const filename = `${uniqueSufix}${ext}`;
  //       callback(null,filename)
        
  //     }
    
  // })}))
  // uploadSingle(@UploadedFile() file, @Body() body):Observable<Object> {
  //   console.log(file);
  //   console.log(body);
  //   return "sucessfully"
  // }
    
  }
