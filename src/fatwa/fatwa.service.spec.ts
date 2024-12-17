import { Test, TestingModule } from '@nestjs/testing';
import { FatwaService } from './fatwa.service';

describe('FatwaService', () => {
  let service: FatwaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FatwaService],
    }).compile();

    service = module.get<FatwaService>(FatwaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
