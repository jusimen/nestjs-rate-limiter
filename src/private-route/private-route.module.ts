import { Module } from '@nestjs/common';
import { PrivateRouteService } from './private-route.service';
import { PrivateRouteController } from './private-route.controller';

@Module({
  controllers: [PrivateRouteController],
  providers: [PrivateRouteService],
})
export class PrivateRouteModule {}
