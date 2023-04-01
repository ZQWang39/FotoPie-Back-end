import { ConfigService } from "@nestjs/config";
import { HttpStatus } from "@nestjs/common/enums";
import { Postsnew } from "./schema/postnew.schema";
import { PostsnewService } from "./postsnew.service";
import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Patch,
  Param,
  Delete,
  HttpException,
  NotFoundException,
  StreamableFile,
} from "@nestjs/common";
import { Req, Res } from "@nestjs/common";
import { PostnewDTO } from "./dto/postnew.dto";
import * as multer from "multer";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import { FileInterceptor } from "@nestjs/platform-express";
import { UseInterceptors, UploadedFile } from "@nestjs/common";
import { UseGuards } from "@nestjs/common/decorators";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guards";
import * as sharp from "sharp";
import { Query as ExpressQuery } from "express-serve-static-core";

// var path = require('path')

@Controller("postsnew")
export class PostsnewController {
  constructor(
    private readonly PostsnewService: PostsnewService,
    private ConfigService: ConfigService
  ) {}

  @Patch("upload")
  @UseInterceptors(FileInterceptor("file", { storage: multer.memoryStorage() }))
  async upload(@UploadedFile() file, @Res() res, @Req() req) {
    const filename = `${uuidv4()}.jpeg`;

    const fileBuffer = await sharp(file.buffer)
      .toFormat("jpeg")
      .jpeg({ quality: 50 })
      .toBuffer();

    // S3 upload
    const s3Clinet = new S3Client({
      region: "ap-southeast-2",
      credentials: {
        accessKeyId: this.ConfigService.get("aws_access_key_id"),
        secretAccessKey: this.ConfigService.get("aws_access_key_secret"),
      },
    });

    await s3Clinet.send(
      new PutObjectCommand({
        Bucket: "fotopie-photo",
        Body: file.buffer,
        Key: filename,
        ContentType: file.mimetype,
      })
    );

    await s3Clinet.send(
      new PutObjectCommand({
        Bucket: "fotopie-photo-compression",
        Body: fileBuffer,
        Key: filename,
        ContentType: "image/jpeg",
      })
    );

    return res.status(HttpStatus.OK).json({
      message: "Confirmed ",
      filename: filename,
      original_path: `https://fotopie-photo.s3.ap-southeast-2.amazonaws.com/${filename}`,
      compression_path: `https://fotopie-photo-compression.s3.ap-southeast-2.amazonaws.com/${filename}`,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post("sent")
  async create(@Body() PostnewDTO: PostnewDTO, @Req() req: any) {
    const postsnew = new Postsnew();
    postsnew.userEmail = req.user["email"];
    postsnew.filename = PostnewDTO.filename;
    postsnew.tag = PostnewDTO.tag;
    postsnew.price = PostnewDTO.price;
    postsnew.description = PostnewDTO.description;
    postsnew.compressFilePath = PostnewDTO.compressFilePath;
    postsnew.orginalFilePath = PostnewDTO.orginalFilePath;

    await this.PostsnewService.create(postsnew);
    return postsnew;
  }
  @Get()
  getAllPosts(@Query() query: ExpressQuery): Promise<PostnewDTO[]> {
    return this.PostsnewService.findAllPosts(query);
  }
}
