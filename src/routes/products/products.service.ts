import { Injectable } from '@nestjs/common';
import { Products } from './products.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Products') private readonly accountModel: Model<Products>,
  ) {}

  create(createAccountDto: Products) {
    return this.accountModel.create({ createAccountDto });
  }

  findAll() {
    return this.accountModel.find();
  }

  findOne(id: string) {
    return this.accountModel.findById(id);
  }

  update(id: string, updateAccountDto: Products) {
    return this.accountModel.updateOne({ _id: id }, { updateAccountDto });
  }

  remove(id: string) {
    return this.accountModel.deleteOne({ _id: id });
  }
}
