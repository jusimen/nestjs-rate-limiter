import mongoose from 'mongoose';

export const AccountModule = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
});

export interface Account extends mongoose.Document {
  token: string;
}
