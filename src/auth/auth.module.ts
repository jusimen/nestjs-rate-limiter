import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SessionSchema } from './auth.model';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Session', schema: SessionSchema }]),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
