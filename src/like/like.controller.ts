import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { CreateLikeDto } from './Dto/createLike.dto';
import { LikeService } from './like.service';


@Controller('like')
export class LikeController {
    constructor(private readonly likeService: LikeService) {}


    // @Post('')
    // checkLike(@Body('id') id:string){
    //     return this.likeService.checkLike
    // }

    @Post('')
    checkLike(@Body("like") like_user_id: string, liked_user_id: string, post_id: string, @Body() createLikeDto: CreateLikeDto){
        return this.likeService.checkLike( like_user_id,liked_user_id, post_id, createLikeDto);
    }
    
    @Get('LikeNumber')
    numberLike(@Param('id')id:string){
        return this.numberLike(id)
    }



//nest g controller collection nest g module colllection nest g s collection


}
