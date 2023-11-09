import { Injectable } from '@nestjs/common';
import { CreatePublicRouteDto } from './dto/create-public-route.dto';
import { UpdatePublicRouteDto } from './dto/update-public-route.dto';

@Injectable()
export class PublicRouteService {
  create(createPublicRouteDto: CreatePublicRouteDto) {
    return 'This action adds a new publicRoute';
  }

  findAll() {
    return `This action returns all publicRoute`;
  }

  findOne(id: number) {
    return `This action returns a #${id} publicRoute`;
  }

  update(id: number, updatePublicRouteDto: UpdatePublicRouteDto) {
    return `This action updates a #${id} publicRoute`;
  }

  remove(id: number) {
    return `This action removes a #${id} publicRoute`;
  }
}
