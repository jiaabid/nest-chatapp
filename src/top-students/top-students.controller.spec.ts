import { Test, TestingModule } from '@nestjs/testing';
import { TopStudentsController } from './top-students.controller';
import { TopStudentsService } from './top-students.service';

describe('TopStudentsController', () => {
  let controller: TopStudentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TopStudentsController],
      providers: [TopStudentsService],
    }).compile();

    controller = module.get<TopStudentsController>(TopStudentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
