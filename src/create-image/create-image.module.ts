import { Module } from "@nestjs/common";
import { CreateImageController } from "./create-image.controller";
import { CreateImageService } from "./create-image.service";

@Module({
  controllers: [CreateImageController],
  providers: [CreateImageService],
})
export class CreateImageModule {}
