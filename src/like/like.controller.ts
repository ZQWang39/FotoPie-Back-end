import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { CreateLikeDto } from './Dto/createLike.dto';
import { LikeService } from './like.service';
import { UseGuards } from "@nestjs/common/decorators";
import { Like } from './schemas/like.schema'


@Controller('like')
export class LikeController {
    constructor(private readonly likeService: LikeService) {}

    @UseGuards(JwtAuthGuard)
    @Post(':filename')
    async getLike(@Param("filename") CreateLikeDto:CreateLikeDto, @Req() req: any) {
    const like = new Like()
    like.like_user_email = req.user["email"];
    like.liked_user_email = await this.likeService.findEmailByFilename(CreateLikeDto.filename);
    like.filename = CreateLikeDto.filename;
    this.likeService.checkLike(like);
    return this.likeService.numberLike(like.filename)
}
}