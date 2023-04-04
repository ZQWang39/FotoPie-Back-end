import { NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { Posts } from 'src/posts/schema/post.schema';
import { LikeService } from './like.service';

// describe('LikeService', () => {
//     let service: LikeService;
  
//     beforeEach(async () => {
//       const module: TestingModule = await Test.createTestingModule({
//         providers: [LikeService],
//       }).compile();
  
//       service = module.get<LikeService>(LikeService);
//     });
  
//     it('should be defined', () => {
//       expect(service).toBeDefined();
//     });
//   });


  //Test findEmailByFilename
  describe('LikeService', () => {
    let service: LikeService;
    let postModel: Model<Posts>;
  
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          LikeService,
          {
            provide: getModelToken('Like'),
            useValue: {},
          },
          {
            provide: getModelToken('Posts'),
            useValue: {},
          },
        ],
      }).compile();
  
      service = module.get<LikeService>(LikeService);
      postModel = module.get<Model<Posts>>(getModelToken('Posts'));
    });
  
    describe('findEmailByFilename', () => {
      it('should return the email of the user who created the post', async () => {
        const createLikeDto = { filename: 'test.jpg' };
  
        const findResult = {
          userEmail: 'test@example.com',
        };
  
        jest.spyOn(postModel, 'findOne').mockReturnValueOnce(Promise.resolve(findResult as Posts));
  
        const result = await service.findEmailByFilename(createLikeDto);
  
        expect(postModel.findOne).toHaveBeenCalledWith(createLikeDto);
        expect(result).toBe(findResult.userEmail);
      });
  
      it('should throw NotFoundException when post is not found', async () => {
        const createLikeDto = { filename: 'test.jpg' };
  
        jest.spyOn(postModel, 'findOne').mockReturnValueOnce(Promise.resolve(null));
  
        await expect(service.findEmailByFilename(createLikeDto)).rejects.toThrow(NotFoundException);
      });
    });
  });

