import { Controller, Get, Query } from "@nestjs/common";
import { NimaService } from "./nima.service";

@Controller("nima")
export class NimaController {
  constructor(private readonly nimaService: NimaService) {}

  @Get()
  async predictScore(@Query("image") imageUrl: string): Promise<number> {
    await this.nimaService.init();
    const score = await this.nimaService.predict(imageUrl);
    return score;
  }
}
