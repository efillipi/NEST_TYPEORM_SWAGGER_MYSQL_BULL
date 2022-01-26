import { Test, TestingModule } from '@nestjs/testing';
import { ValidateAcountService } from './validate-acount.service';

describe('ValidateAcountService', () => {
  let service: ValidateAcountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ValidateAcountService],
    }).compile();

    service = module.get<ValidateAcountService>(ValidateAcountService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
