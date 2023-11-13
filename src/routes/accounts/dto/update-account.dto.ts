import { Account } from 'src/schemas/account.schema';

export class UpdateAccountDto implements Readonly<Account> {
  accountName: string;
  accountNumber: string;
  amount: string;
  currency: string;
}
