import { Test, TestingModule } from '@nestjs/testing';
import { PublicRouteController } from './public-route.controller';
import { PublicRouteService } from './public-route.service';

describe('PublicRouteController', () => {
  let controller: PublicRouteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PublicRouteController],
      providers: [PublicRouteService],
    }).compile();

    controller = module.get<PublicRouteController>(PublicRouteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
