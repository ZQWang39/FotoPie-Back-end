import { Controller, Get, Query, HttpCode, HttpStatus } from "@nestjs/common";
import { DownloadService } from "./download.service";

@Controller("download")
export class DownloadController {
  constructor(private downloadService: DownloadService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getPresignedUrl(
    @Query("filename") filename: string
  ): Promise<{ url: string }> {
    const preSignedUrl = await this.downloadService.generatePresignedUrl(
      filename
    );
    console.log("preSignedUrl", preSignedUrl);
    return { url: preSignedUrl };
  }
}
