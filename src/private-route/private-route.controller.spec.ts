import { Test, TestingModule } from '@nestjs/testing';
import { PrivateRouteController } from './private-route.controller';
import { PrivateRouteService } from './private-route.service';

describe('PrivateRouteController', () => {
  let controller: PrivateRouteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrivateRouteController],
      providers: [PrivateRouteService],
    }).compile();

    controller = module.get<PrivateRouteController>(PrivateRouteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
