import { FileInterceptor } from "@nestjs/platform-express";
import { Request, Response, Express } from "express";
import * as multer from "multer";
import { v4 as uuidv4 } from "uuid";
import * as sharp from "sharp";
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Patch,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

import { EditUserService } from "./editUser.service";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guards";
import { EditUserDto } from "./dto/edit-user.dto";

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY as string;
const secretAccessKey = process.env.SECRET_ACCESS_KEY as string;

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

    if (!updatedData) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }

    return res.status(HttpStatus.OK).json({
      message: "success",
      updatedData,
    });
  }

  // get user info
  @Get("me")
  async me(@Req() req: Request, @Res() res: Response) {
    const userEmail = req.user["email"];
    const user = await this.editUserService.findByEmail(userEmail);

    if (!user) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }

    const { firstName, lastName, avatar, avatarPath, _id } = user;

    return res.status(HttpStatus.OK).json({
      message: "success",
      firstName,
      lastName,
      avatar,
      avatarPath,
      id: _id,
    });
  }

  // upload avatar
  @Patch("upload")
  // set multer middleware
  @UseInterceptors(
    FileInterceptor("file", {
      storage: multer.memoryStorage(),
      fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith("image")) {
          cb(null, true);
        } else {
          cb(
            new HttpException(
              "Not an image! Please upload only images.",
              HttpStatus.BAD_REQUEST
            ),
            false
          );
        }
      },
    })
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
    @Res() res: Response
  ) {
    // set file name
    const fileName = `user-${uuidv4()}.jpeg`;

    // resize image
    const fileBuffer = await sharp(file.buffer)
      .resize(500, 500)
      .toFormat("jpeg")
      .jpeg({ quality: 10 })
      .toBuffer();

    // S3 upload
    const s3Clinet = new S3Client({
      region: bucketRegion,
      credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey,
      },
    });

    try {
      await s3Clinet.send(
        new PutObjectCommand({
          Bucket: bucketName,
          Body: fileBuffer,
          Key: fileName,
          ContentType: file.mimetype,
        })
      );
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }

    // get user email from jwt token
    const userEmail = req.user["email"];

    // update avatar in db
    const user = await this.editUserService.updateAvatarByEmail(userEmail, {
      avatar: fileName,
      avatarPath: `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/${fileName}`,
    });

    const { avatar, avatarPath } = user;

    if (!user) {
      throw new HttpException("error", HttpStatus.BAD_REQUEST);
    }

    return res.status(HttpStatus.OK).json({
      message: "success",
      avatar,
      avatarPath,
    });
  }
}
