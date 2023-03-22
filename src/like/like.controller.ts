import { Body, Controller, Get, HttpStatus, NotFoundException, Param, Post, Req } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { CreateLikeDto } from './Dto/createLike.dto';
import { LikeService } from './like.service';
import { UserLikeDto } from './Dto/UserLike.dto';
import { HttpCode, UseGuards } from "@nestjs/common/decorators";
import { Like } from './schemas/like.schema'

@Controller('like')
export class LikeController {
    constructor(private readonly likeService: LikeService) {}
    
    @UseGuards(JwtAuthGuard)
    @Post(":filename")
    @HttpCode(HttpStatus.CREATED)
    async getLike(@Param() createLikeDto:CreateLikeDto, @Req() req: any) {
    const like = new Like()
    like.like_user_email = req.user["email"];
    like.liked_user_email = await this.likeService.findEmailByFilename(createLikeDto);
    like.filename = createLikeDto.filename;
    await this.likeService.checkLike(like);
    const likeNumber = await this.likeService.numberLike(createLikeDto)
    return { userLikes:likeNumber }
}
}