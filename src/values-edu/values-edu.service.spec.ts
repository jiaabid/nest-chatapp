import { Test, TestingModule } from '@nestjs/testing';
import { ValuesEduService } from './values-edu.service';

describe('ValuesEduService', () => {
  let service: ValuesEduService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ValuesEduService],
    }).compile();

    service = module.get<ValuesEduService>(ValuesEduService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
