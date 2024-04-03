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
import { OpportunitesService } from './opportunites.service';
import { CreateOpportuniteDto } from './dto/create-opportunite.dto';
import { UpdateOpportuniteDto } from './dto/update-opportunite.dto';
import { Role } from 'src/auth/decorator/role';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('opportunites')
export class OpportunitesController {
  constructor(private readonly opportunitesService: OpportunitesService) {}

  @Post()
  create(@Body() createOpportuniteDto: CreateOpportuniteDto) {
    return this.opportunitesService.create(createOpportuniteDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Role(['admin','chef']) role) {
    return this.opportunitesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.opportunitesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOpportuniteDto: UpdateOpportuniteDto,
  ) {
    return this.opportunitesService.update(+id, updateOpportuniteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.opportunitesService.remove(+id);
  }
}
