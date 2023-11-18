import { Test, TestingModule } from '@nestjs/testing';
import { ValuesEduController } from './values-edu.controller';
import { ValuesEduService } from './values-edu.service';

describe('ValuesEduController', () => {
  let controller: ValuesEduController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ValuesEduController],
      providers: [ValuesEduService],
    }).compile();

    controller = module.get<ValuesEduController>(ValuesEduController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
