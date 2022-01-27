import { Test, TestingModule } from '@nestjs/testing';
import { ValidateAcountController } from './validate-acount.controller';

describe('ValidateAcountController', () => {
  let controller: ValidateAcountController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ValidateAcountController],
    }).compile();

    controller = module.get<ValidateAcountController>(ValidateAcountController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
