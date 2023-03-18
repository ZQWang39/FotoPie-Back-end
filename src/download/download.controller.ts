import { Controller, Get, Query, HttpCode, HttpStatus } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { DownloadService } from "./download.service";

@Controller("download")
export class DownloadController {
  constructor(private downloadService: DownloadService) {}
  @Get()
  @HttpCode(HttpStatus.OK)
  async getPresignedUrl(@Query("filename") filename: string): Promise<string> {
    // ): Promise<{ url: string }> {
    // const s3Url = process.env.BUCKET_PHOTO_PREFIX;
    // const url = `${s3Url}/${filename}`;
    const preSignedUrl = await this.downloadService.generatePresignedUrl(
      filename
    );
    console.log("preSignedUrl", preSignedUrl);
    return preSignedUrl;
  }
  // return { url: preSignedUrl };
}
