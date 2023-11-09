import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PublicRouteService } from './public-route.service';
import { CreatePublicRouteDto } from './dto/create-public-route.dto';
import { UpdatePublicRouteDto } from './dto/update-public-route.dto';

@Controller('public-route')
export class PublicRouteController {
  constructor(private readonly publicRouteService: PublicRouteService) {}

  @Post()
  create(@Body() createPublicRouteDto: CreatePublicRouteDto) {
    return this.publicRouteService.create(createPublicRouteDto);
  }

  @Get()
  findAll() {
    return this.publicRouteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.publicRouteService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePublicRouteDto: UpdatePublicRouteDto) {
    return this.publicRouteService.update(+id, updatePublicRouteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.publicRouteService.remove(+id);
  }
}
