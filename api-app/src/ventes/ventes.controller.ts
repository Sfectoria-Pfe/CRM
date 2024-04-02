import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VentesService } from './ventes.service';
import { CreateVenteDto } from './dto/create-vente.dto';
import { UpdateVenteDto } from './dto/update-vente.dto';

@Controller('ventes')
export class VentesController {
  constructor(private readonly ventesService: VentesService) {}

  @Post()
  create(@Body() createVenteDto: CreateVenteDto) {
    return this.ventesService.create(createVenteDto);
  }

  @Get()
  findAll() {
    return this.ventesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ventesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVenteDto: UpdateVenteDto) {
    return this.ventesService.update(+id, updateVenteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ventesService.remove(+id);
  }
}
