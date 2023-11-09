import { PartialType } from '@nestjs/mapped-types';
import { CreatePublicRouteDto } from './create-public-route.dto';

export class UpdatePublicRouteDto extends PartialType(CreatePublicRouteDto) {}
