import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Session } from './auth.model';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('Session') private readonly sessionModel: Model<Session>,
  ) {}

  async validateSessionToken(token: string): Promise<boolean> {
    const session = await this.sessionModel.findOne({ token: token });
    return session ? true : false;
  }
}
