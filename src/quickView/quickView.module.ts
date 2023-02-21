import { Module } from "@nestjs/common";
import { QuickViewService } from "./quickView.service";
import { QuickViewController } from "./quickView.controller";

@Module({
  imports: [],
  controllers: [QuickViewController],
  providers: [QuickViewService],
})
export class QuickViewModule {}
