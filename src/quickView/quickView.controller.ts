import { Controller, Get, Param } from "@nestjs/common";
import { ObjectId } from "mongoose";
import { QuickViewService } from "./quickView.service";

@Controller("quickView")
export class QuickViewController {
  constructor(private quickViewService: QuickViewService) {}

  @Get(":id")
  async getPostInfo(@Param('uuid') uuid: string): Promise<object> {
    return this.quickViewService.getPostInfo(uuid);
  }
}
