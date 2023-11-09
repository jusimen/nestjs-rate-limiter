import mongoose from 'mongoose';

export const SessionSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
});

export interface Session extends mongoose.Document {
  token: string;
}
