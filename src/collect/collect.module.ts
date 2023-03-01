import { Module } from "@nestjs/common";
import { CollectService } from "./collect.service";
import { CollectController } from "./collect.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Collect, CollectSchema } from "./schemas/collect.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Collect.name, schema: CollectSchema }]),
  ],
  controllers: [CollectController],
  providers: [CollectService],
  exports: [CollectService],
})
export class CollectModule {}
