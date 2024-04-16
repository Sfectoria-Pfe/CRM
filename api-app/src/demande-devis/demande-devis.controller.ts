import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DemandeDevisService } from './demande-devis.service';
import { CreateDemandeDeviDto } from './dto/create-demande-devi.dto';
import { UpdateDemandeDeviDto } from './dto/update-demande-devi.dto';

@Controller('demande-devis')
export class DemandeDevisController {
  constructor(private readonly demandeDevisService: DemandeDevisService) {}

  @Post()
  create(@Body() createDemandeDeviDto: CreateDemandeDeviDto) {
    return this.demandeDevisService.create(createDemandeDeviDto);
  }

  @Get()
  findAll() {
    return this.demandeDevisService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.demandeDevisService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDemandeDeviDto: UpdateDemandeDeviDto) {
    return this.demandeDevisService.update(+id, updateDemandeDeviDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.demandeDevisService.remove(+id);
  }
}
