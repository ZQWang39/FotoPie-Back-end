import { FileInterceptor } from "@nestjs/platform-express";
import { Request, Response } from "express";
import * as multer from "multer";
import { v4 as uuidv4 } from "uuid";
import * as sharp from "sharp";
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Patch,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";

import { EditUserService } from "./editUser.service";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guards";
import { EditUserDto } from "./dto/edit-user.dto";

// export const multerStorage = multer.memoryStorage();

@UseGuards(JwtAuthGuard)
@Controller("editUser")
export class EditUserController {
  constructor(private editUserService: EditUserService) {}

  // update user name
  @Patch("/updateName")
  async editUser(
    @Req() req: Request,
    @Body() dto: EditUserDto,
    @Res() res: Response
  ) {
    const userEmail = req.user["email"];
    const updatedData = await this.editUserService.updateNameByEmail(
      userEmail,
      dto
    );
    return res.status(HttpStatus.OK).json({
      message: "success",
      data: {
        updatedData,
      },
    });
  }

  // get user info
  @Get("me")
  async me(@Req() req: Request, @Res() res: Response) {
    const userEmail = req.user["email"];
    const userData = await this.editUserService.findByEmail(userEmail);
    return res.status(HttpStatus.OK).json({
      message: "success",
      data: {
        userData,
      },
    });
  }

  // upload avatar
  @Patch("upload")
  // 缓存照片
  @UseInterceptors(
    FileInterceptor("file", {
      storage: multer.memoryStorage(),
    })
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
    @Res() res: Response
  ) {
    // 修改文件名
    console.log(file);
    file.filename = `user-${uuidv4()}.jpg`;

    // 保存图片
    await sharp(file.buffer)
      .resize(500, 500)
      .toFormat("jpg")
      .jpeg({ quality: 90 })
      .toFile(`public/${file.filename}`);

    // 提取用户email
    const userEmail = req.user["email"];

    // 更新数据库头像文件名
    const updateAvatar = await this.editUserService.updateAvatarByEmail(
      userEmail,
      {
        avatar: file.filename,
      }
    );

    return res.status(HttpStatus.OK).json({
      message: "success",
      data: {
        updateAvatar,
      },
    });
  }
}

// <img src=`public/{avatarFileName}`>