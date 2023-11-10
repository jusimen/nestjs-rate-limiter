import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SessionSchema } from './auth.model';
import { MongooseModule } from '@nestjs/mongoose';
import { UtilsModule } from 'src/common/utils/utils.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Session', schema: SessionSchema }]),
    UtilsModule,
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
