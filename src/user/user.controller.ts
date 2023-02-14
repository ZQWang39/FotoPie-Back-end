import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  NotFoundException,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { UserRo } from "./ro/login-user.ro";

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

  @Post("login")
  async login(@Body("user") loginUserDto: LoginUserDto): Promise<UserRo> {
    const findedUser = await this.userService.findOne(loginUserDto);
    if (!findedUser) {
      throw new NotFoundException();
    }
    const token = await this.userService.generateJWT(findedUser);
    const { password, ...rest } = findedUser;
    const userWithToken = { rest, token };
    return null; // Todo: userWithToken function setup
  }
}
