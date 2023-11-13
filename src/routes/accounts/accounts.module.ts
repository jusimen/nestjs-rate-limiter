import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { UtilsModule } from 'src/common/utils/utils.module';
import { AccountSchema } from 'src/schemas/account.schema';

@Module({
  controllers: [AccountsController],
  providers: [AccountsService],
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: 'Accounts', schema: AccountSchema }]),
    UtilsModule,
  ],
})
export class AccountsModule {}
