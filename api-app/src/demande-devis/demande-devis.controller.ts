import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { DemandeDevisService } from './demande-devis.service';
import { CreateDemandeDeviDto } from './dto/create-demande-devi.dto';
import { UpdateDemandeDeviDto } from './dto/update-demande-devi.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorator/current-user';

@Controller('demande-devis')
export class DemandeDevisController {
  constructor(private readonly demandeDevisService: DemandeDevisService) {}
  
  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createDemandeDeviDto: CreateDemandeDeviDto,
    @CurrentUser() user: any,
  ) {
    return this.demandeDevisService.create(createDemandeDeviDto, user.clientId);
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
  update(
    @Param('id') id: string,
    @Body() updateDemandeDeviDto: UpdateDemandeDeviDto,
  ) {
    return this.demandeDevisService.update(+id, updateDemandeDeviDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.demandeDevisService.remove(+id);
  }
}
