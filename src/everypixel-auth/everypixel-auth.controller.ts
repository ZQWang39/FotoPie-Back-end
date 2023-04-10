import { Controller, Get,Body } from "@nestjs/common";
import { MyService } from "./everypixel-auth.service";
import { Query } from "@nestjs/common/decorators";
import { Query as ExpressQuery } from "express-serve-static-core";

@Controller("everypixel")
export class MyController {
  constructor(private readonly myService: MyService) {}

  // @Get()
  // async getData(): Promise<any> {
  //   const data = await this.myService.fetchData();
  //   return data;
  // }

  @Get()
  async getToken(): Promise<any> {
    const data = await this.myService.getToken();
    return data;
  }

  @Get("quality")
  async getQuality(
    @Query("url") url?: string,
    @Body() data?: Record<string, any>
  ): Promise<any> {
    const quality = await this.myService.getQuality({ url, data });
    return quality;
  }
}
