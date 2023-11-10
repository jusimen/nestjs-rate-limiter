import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountsSchema } from './accounts.model';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [AccountsController],
  providers: [AccountsService],
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: 'Accounts', schema: AccountsSchema }]),
  ],
})
export class AccountsModule {}
