import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { LikeService } from './like.service';


@Controller('like')
export class LikeController {
    constructor(private readonly likeService: LikeService) {}


    @Post('')
    checkLike(@Body('id') id:string){
        return this.likeService.checkLike
    }
    



//nest g controller collection nest g module colllection nest g s collection


}
