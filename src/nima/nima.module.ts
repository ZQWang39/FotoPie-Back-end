import { Module } from "@nestjs/common";
import { NimaService } from "./nima.service";

@Module({
  providers: [NimaService],
  exports: [NimaService],
})
export class NimaModule {}
