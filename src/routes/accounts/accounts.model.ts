import mongoose from 'mongoose';

export const AccountsSchema = new mongoose.Schema({
  accountName: {
    type: String,
  },
  accountNumber: {
    type: String,
  },
  amount: {
    type: String,
  },
  currency: {
    type: String,
  },
});

export interface Accounts extends mongoose.Document {
  accountName: string;
  accountNumber: string;
  amount: string;
  currency: string;
}
