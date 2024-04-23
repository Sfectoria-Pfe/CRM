import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { OpportunitesService } from './opportunites.service';
import { CreateOpportuniteDto } from './dto/create-opportunite.dto';
import { UpdateOpportuniteDto } from './dto/update-opportunite.dto';
import { Role } from 'src/auth/decorator/role';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorator/current-user';

@Controller('opportunites')
export class OpportunitesController {
  constructor(private readonly opportunitesService: OpportunitesService) {}

  @Post()
  create(@Body() createOpportuniteDto: CreateOpportuniteDto) {
    return this.opportunitesService.create(createOpportuniteDto);
  }

  // @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Query() query:any) { //@Role(['admin','chef']) role
    return this.opportunitesService.findAll(+query.numberService);
  }

  @Get(':id')
  findOne(@Param('id') id: string,
// @CurrentUser() user
) {
    
    return this.opportunitesService.findOne(+id,
      // user.employee.equipe.id
    );
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
