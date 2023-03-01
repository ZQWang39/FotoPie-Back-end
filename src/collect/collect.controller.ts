import { Controller, Get, Post, Body, Param, Delete } from "@nestjs/common";
import { CollectService } from "./collect.service";

import { Collect } from "./schemas/collect.schema";

@Controller("collect")
export class CollectController {
  constructor(private readonly collectService: CollectService) {}

  @Post("")
  addCollect(@Body("id") id: string) {
    return this.collectService.addCollect;
  }

  @Delete("")
  deleteCollect(@Body("id") id: string) {
    // return this.collectService.deleteCollect;
  }
}
