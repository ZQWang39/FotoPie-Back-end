import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
// import { AuthService } from './auth/auth.service';



@Module({
  imports:  [ AuthModule, MongooseModule.forRoot("mongodb+srv://JeremyLiu:fotopie666@cluster0.mkgi0yb.mongodb.net/olivia")],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
