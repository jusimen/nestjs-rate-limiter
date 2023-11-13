import { Account } from 'src/schemas/account.schema';

export class CreateAccountDto implements Readonly<Account> {
  accountName: string;
  accountNumber: string;
  amount: string;
  currency: string;
}
