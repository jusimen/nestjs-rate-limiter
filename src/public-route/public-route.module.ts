import { Module } from '@nestjs/common';
import { PublicRouteService } from './public-route.service';
import { PublicRouteController } from './public-route.controller';

@Module({
  controllers: [PublicRouteController],
  providers: [PublicRouteService],
})
export class PublicRouteModule {}
