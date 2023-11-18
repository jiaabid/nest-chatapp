import { Test, TestingModule } from '@nestjs/testing';
import { QualityEduService } from './quality-edu.service';

describe('QualityEduService', () => {
  let service: QualityEduService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QualityEduService],
    }).compile();

    service = module.get<QualityEduService>(QualityEduService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
