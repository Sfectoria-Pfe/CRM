import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategorieclientsService } from './categorieclients.service';
import { CreateCategorieclientDto } from './dto/create-categorieclient.dto';
import { UpdateCategorieclientDto } from './dto/update-categorieclient.dto';

@Controller('categorieclients')
export class CategorieclientsController {
  constructor(private readonly categorieclientsService: CategorieclientsService) {}

  @Post()
  create(@Body() createCategorieclientDto: CreateCategorieclientDto) {
    return this.categorieclientsService.create(createCategorieclientDto);
  }

  @Get()
  findAll() {
    return this.categorieclientsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categorieclientsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategorieclientDto: UpdateCategorieclientDto) {
    return this.categorieclientsService.update(+id, updateCategorieclientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categorieclientsService.remove(+id);
  }
}
