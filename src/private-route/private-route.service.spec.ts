import { Test, TestingModule } from '@nestjs/testing';
import { PrivateRouteService } from './private-route.service';

describe('PrivateRouteService', () => {
  let service: PrivateRouteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrivateRouteService],
    }).compile();

    service = module.get<PrivateRouteService>(PrivateRouteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
