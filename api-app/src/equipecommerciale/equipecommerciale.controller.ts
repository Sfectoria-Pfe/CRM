import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EquipecommercialeService } from './equipecommerciale.service';
import { CreateEquipecommercialeDto } from './dto/create-equipecommerciale.dto';
import { UpdateEquipecommercialeDto } from './dto/update-equipecommerciale.dto';

@Controller('equipecommerciale')
export class EquipecommercialeController {
  constructor(private readonly equipecommercialeService: EquipecommercialeService) {}

  @Post()
  create(@Body() createEquipecommercialeDto: CreateEquipecommercialeDto) {
    return this.equipecommercialeService.create(createEquipecommercialeDto);
  }

  @Get()
  findAll() {
    return this.equipecommercialeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.equipecommercialeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEquipecommercialeDto: UpdateEquipecommercialeDto) {
    return this.equipecommercialeService.update(+id, updateEquipecommercialeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.equipecommercialeService.remove(+id);
  }
}
