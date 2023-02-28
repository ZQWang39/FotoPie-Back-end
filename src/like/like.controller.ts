import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { CreateLikeDto } from './Dto/createLike.dto';
import { LikeService } from './like.service';


@Controller('like')
export class LikeController {
    constructor(private readonly likeService: LikeService) {}

    @UseGuard()
    @Post('')
    async getLike(@Param("like") fileName: string,){ //findEmailby
        // const like_user_email= await //Guard 
        // const liked_user_email = await this.likeService.findEmailByFilename;
        this.likeService.checklike(like_user_email,liked_user_email,fileName);
        return this.likeService.numberLike(fileName);
}
}