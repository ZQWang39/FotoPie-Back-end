import { Module } from "@nestjs/common";
import { CalculateQualityService } from "./calculate-quality.service";
import { CalculateQualityController } from "./calculate-quality.controller";

@Module({
  providers: [CalculateQualityService],
  controllers: [CalculateQualityController],
})
export class CalculateQualityModule {}
