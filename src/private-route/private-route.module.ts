import { Module } from '@nestjs/common';
import { PrivateRouteService } from './private-route.service';
import { PrivateRouteController } from './private-route.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [PrivateRouteController],
  providers: [PrivateRouteService],
  imports: [AuthModule],
})
export class PrivateRouteModule {}
