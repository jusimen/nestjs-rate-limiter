import { PartialType } from '@nestjs/mapped-types';
import { CreatePrivateRouteDto } from './create-private-route.dto';

export class UpdatePrivateRouteDto extends PartialType(CreatePrivateRouteDto) {}
