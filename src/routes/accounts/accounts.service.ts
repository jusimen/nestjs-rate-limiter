import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from 'src/schemas/account.schema';

@Injectable()
export class AccountsService {
  constructor(
    @InjectModel('Accounts') private readonly accountModel: Model<Account>,
  ) {}

  create(createAccountDto: CreateAccountDto) {
    return this.accountModel.create(createAccountDto);
  }

  findAll() {
    return this.accountModel.find();
  }

  findOne(id: string) {
    return this.accountModel.findById(id);
  }

  update(id: string, updateAccountDto: UpdateAccountDto) {
    return this.accountModel.updateOne({ _id: id }, updateAccountDto);
  }

  remove(id: string) {
    return this.accountModel.deleteOne({ _id: id });
  }
}
