import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PrivateRouteService } from './private-route.service';
import { CreatePrivateRouteDto } from './dto/create-private-route.dto';
import { UpdatePrivateRouteDto } from './dto/update-private-route.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('private-route')
@UseGuards(AuthGuard)
export class PrivateRouteController {
  constructor(private readonly privateRouteService: PrivateRouteService) {}

  @Post()
  create(@Body() createPrivateRouteDto: CreatePrivateRouteDto) {
    return this.privateRouteService.create(createPrivateRouteDto);
  }

  @Get()
  findAll() {
    return this.privateRouteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.privateRouteService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePrivateRouteDto: UpdatePrivateRouteDto,
  ) {
    return this.privateRouteService.update(+id, updatePrivateRouteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.privateRouteService.remove(+id);
  }
}
