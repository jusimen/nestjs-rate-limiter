import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AccountDocument = HydratedDocument<Account>;

@Schema()
export class Account {
  @Prop()
  accountName: string;

  @Prop()
  accountNumber: string;

  @Prop()
  amount: string;

  @Prop()
  currency: string;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
