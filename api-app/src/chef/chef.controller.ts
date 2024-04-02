import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ChefService } from './chef.service';
import { CreateChefDto } from './dto/create-chef.dto';
import { UpdateChefDto } from './dto/update-chef.dto';

@Controller('chef')
export class ChefController {
  constructor(private readonly chefService: ChefService) {}

  @Post()
  create(@Body() createChefDto: CreateChefDto) {
    return this.chefService.create(createChefDto);
  }

  @Get()
  findAll() {
    return this.chefService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chefService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChefDto: UpdateChefDto) {
    return this.chefService.update(+id, updateChefDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chefService.remove(+id);
  }
}