import { HttpStatus } from "@nestjs/common/enums";
import { Posts } from "./schema/post.schema";
import { PostsService } from "./posts.service";
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
import { PostDTO } from "./dto/post.dto";
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

@Controller("posts")
export class PostsController {
  constructor(private readonly PostsService: PostsService) {}

  @Patch("upload")
  @UseInterceptors(FileInterceptor("file", { storage: multer.memoryStorage() }))
  async upload(@UploadedFile() file, @Res() res, @Req() req) {
    const filename = `${uuidv4()}.jpeg`;

    const fileBuffer = await sharp(file.buffer)
      .toFormat("jpeg")
      .jpeg({ quality: 50 })
      .toBuffer();

    // S3 upload
    const bucketNameOrginial = process.env.AWS_BUCKET_NAME_PHOTO;
    const bucketNameCompression = process.env.AWS_BUCKET_NAME_PHOTO_compression;
    const bucketRegion = process.env.AWS_BUCKET_REGION_PHOTO;
    const accessKey = process.env.AWS_PHOTO_ACCESS_KEY as string;
    const secretAccessKey = process.env.AWS_PHOTO_SECRECT_KEY as string;

    const s3Clinet = new S3Client({
      region: bucketRegion,
      credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey,
      },
    });

    await s3Clinet.send(
      new PutObjectCommand({
        Bucket: bucketNameOrginial,
        Body: file.buffer,
        Key: filename,
        ContentType: file.mimetype,
      })
    );

    await s3Clinet.send(
      new PutObjectCommand({
        Bucket: bucketNameCompression,
        Body: fileBuffer,
        Key: filename,
        ContentType: "image/jpeg",
      })
    );

    return res.status(HttpStatus.OK).json({
      message: "Confirmed ",
      filename: filename,
      original_path: `https://${bucketNameOrginial}.s3.${bucketRegion}.amazonaws.com/${filename}`,
      compression_path: `https://${bucketNameCompression}.s3.${bucketRegion}.amazonaws.com/${filename}`,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post("sent")
  async create(@Body() PostDTO: PostDTO, @Req() req: any) {
    const posts = new Posts();
    posts.userEmail = req.user["email"];
    posts.filename = PostDTO.filename;
    posts.tag = PostDTO.tag;
    posts.price = PostDTO.price;
    posts.description = PostDTO.description;
    posts.compressFilePath = PostDTO.compressFilePath;
    posts.orginalFilePath = PostDTO.orginalFilePath;

    await this.PostsService.create(posts);
    return posts;
  }
  @Get()
  getAllPosts(@Query() query: ExpressQuery): Promise<PostDTO[]> {
    return this.PostsService.findAllPosts(query);
  }
}
