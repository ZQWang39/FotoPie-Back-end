import { Module } from "@nestjs/common";
import { DownloadController } from "./download.controller";
import { DownloadService } from "./download.service";

@Module({
  controllers: [DownloadController],
  providers: [DownloadService],
  exports: [DownloadService],
})
export class DownloadModule {}
