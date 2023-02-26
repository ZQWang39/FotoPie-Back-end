import { Module } from "@nestjs/common";
import { ResetService } from "./reset.service";
import { ResetController } from "./reset.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./schemas/user.schema";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: "15m" },
    }),
  ],
  controllers: [ResetController],
  providers: [ResetService],
})
export class ResetModule {}
