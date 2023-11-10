import { Injectable } from '@nestjs/common';
import { Accounts } from './accounts.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AccountsService {
  constructor(
    @InjectModel('Accounts') private readonly accountModel: Model<Accounts>,
  ) {}

  create(createAccountDto: Accounts) {
    return this.accountModel.create(createAccountDto);
  }

  findAll() {
    return this.accountModel.find();
  }

  findOne(id: string) {
    return this.accountModel.findById(id);
  }

  update(id: string, updateAccountDto: Accounts) {
    return this.accountModel.updateOne({ _id: id }, updateAccountDto);
  }

  remove(id: string) {
    return this.accountModel.deleteOne({ _id: id });
  }
}
