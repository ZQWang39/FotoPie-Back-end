import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CatsModule } from "./cats/cats.module";

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGO_URL), CatsModule],
})
export class AppModule {}
