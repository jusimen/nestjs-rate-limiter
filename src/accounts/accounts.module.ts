import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountsSchema } from './accounts.model';

@Module({
  controllers: [AccountsController],
  providers: [AccountsService],
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: 'Accounts', schema: AccountsSchema }]),
  ],
})
export class AccountsModule {}
