import { Test, TestingModule } from '@nestjs/testing';
import { MusicsController } from './musics.controller';
import { MusicsService } from './musics.service';

describe('MusicsController', () => {
  let controller: MusicsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MusicsController],
      providers: [MusicsService],
    }).compile();

    controller = module.get<MusicsController>(MusicsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
