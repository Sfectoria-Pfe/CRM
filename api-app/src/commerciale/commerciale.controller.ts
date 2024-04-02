import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CommercialeService } from './commerciale.service';
import { CreateCommercialeDto } from './dto/create-commerciale.dto';
import { UpdateCommercialeDto } from './dto/update-commerciale.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('COMMERCIALE')
@Controller('commerciale')
export class CommercialeController {
  constructor(private readonly commercialeService: CommercialeService) {}

  @Post()
  create(@Body() createCommercialeDto: CreateCommercialeDto) {
    return this.commercialeService.create(createCommercialeDto);
  }

  @Get()
  findAll() {
    return this.commercialeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commercialeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommercialeDto: UpdateCommercialeDto) {
    return this.commercialeService.update(+id, updateCommercialeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commercialeService.remove(+id);
  }
}
