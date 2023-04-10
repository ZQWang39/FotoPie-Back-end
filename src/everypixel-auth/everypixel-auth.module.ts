import { Module } from "@nestjs/common";
import { MyService } from "./everypixel-auth.service";
import { MyController } from "./everypixel-auth.controller";

@Module({
  providers: [MyService],
  controllers: [MyController],
})
export class MyModule {}
