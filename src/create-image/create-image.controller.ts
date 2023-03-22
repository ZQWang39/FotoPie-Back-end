import { Controller, Post, Body, HttpCode, HttpStatus } from "@nestjs/common";
import { CreateImageService } from "./create-image.service";

@Controller("create-image")
export class CreateImageController {
  constructor(private createImageService: CreateImageService) {}

  @Post("new-image")
  @HttpCode(HttpStatus.OK)
  async createImage(@Body() body: { prompt: string }): Promise<object> {
    return this.createImageService.createNewImage(body.prompt);
  }
}
