import { Test, TestingModule } from '@nestjs/testing';
import { LikeController } from './like.controller';
import { LikeService } from './like.service';

describe('LikeController', () => {
  let controller: LikeController;
  let service: LikeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LikeController],
      providers: [
        {
          provide: LikeService,
          useValue: {
            findEmailByFilename: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<LikeController>(LikeController);
    service = module.get<LikeService>(LikeService);
  });

  // describe('findEmailByFilename', () => {
  //   it('should return the email of the user who created the post', async () => {
  //     const filename = 'test.jpg';
  //     const userEmail = 'test@example.com';

  //     jest.spyOn(service, 'findEmailByFilename').mockResolvedValueOnce(userEmail);

  //     const result = await controller.findEmailByFilename({ filename });

  //     expect(service.findEmailByFilename).toHaveBeenCalledWith({ filename });
  //     expect(result).toEqual({ userEmail });
  //   });
  // });
});
  