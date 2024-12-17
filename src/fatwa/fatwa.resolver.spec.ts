import { Test, TestingModule } from '@nestjs/testing';
import { FatwaResolver } from './fatwa.resolver';
import { FatwaService } from './fatwa.service';

describe('FatwaResolver', () => {
  let resolver: FatwaResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FatwaResolver, FatwaService],
    }).compile();

    resolver = module.get<FatwaResolver>(FatwaResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
