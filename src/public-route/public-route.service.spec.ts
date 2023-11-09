import { Test, TestingModule } from '@nestjs/testing';
import { PublicRouteService } from './public-route.service';

describe('PublicRouteService', () => {
  let service: PublicRouteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PublicRouteService],
    }).compile();

    service = module.get<PublicRouteService>(PublicRouteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
