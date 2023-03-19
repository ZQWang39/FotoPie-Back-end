import { Controller, Get, Query } from "@nestjs/common";
import { DownloadService } from "./download.service";

@Controller("download")
export class DownloadController {
  constructor(private downloadService: DownloadService) {}

  @Get()
  async getPresignedUrl(@Query("filename") filename: string): Promise<string> {
    const preSignedUrl = await this.downloadService.generatePresignedUrl(
      filename
    );
    console.log("preSignedUrl", preSignedUrl);
    return preSignedUrl;
  }
}
