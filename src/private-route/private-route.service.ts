import { Injectable } from '@nestjs/common';
import { CreatePrivateRouteDto } from './dto/create-private-route.dto';
import { UpdatePrivateRouteDto } from './dto/update-private-route.dto';

@Injectable()
export class PrivateRouteService {
  create(createPrivateRouteDto: CreatePrivateRouteDto) {
    return 'This action adds a new privateRoute';
  }

  findAll() {
    return `This action returns all privateRoute`;
  }

  findOne(id: number) {
    return `This action returns a #${id} privateRoute`;
  }

  update(id: number, updatePrivateRouteDto: UpdatePrivateRouteDto) {
    return `This action updates a #${id} privateRoute`;
  }

  remove(id: number) {
    return `This action removes a #${id} privateRoute`;
  }
}
