import { Test, TestingModule } from '@nestjs/testing';
import { QualityEduController } from './quality-edu.controller';
import { QualityEduService } from './quality-edu.service';

describe('QualityEduController', () => {
  let controller: QualityEduController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QualityEduController],
      providers: [QualityEduService],
    }).compile();

    controller = module.get<QualityEduController>(QualityEduController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
