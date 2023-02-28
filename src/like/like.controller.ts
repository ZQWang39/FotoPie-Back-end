import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { CreateLikeDto } from './Dto/createLike.dto';
import { LikeService } from './like.service';
import { UseGuards } from "@nestjs/common/decorators";



@Controller('like')
export class LikeController {
    constructor(private readonly likeService: LikeService) {}

    @UseGuards(JwtAuthGuard)
    @Post('')
    async getLike(@Param("like") fileName: string, @Req() req:any){ 
        const like_user_email= await req.user["email"];
        const liked_user_email = await this.likeService.findEmailByFilename;
        this.likeService.checkLike(CreateLikeDto);
        return this.likeService.numberLike(fileName);
}
}