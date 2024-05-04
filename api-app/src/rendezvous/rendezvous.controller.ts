import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RendezvousService } from './rendezvous.service';
import { CreateRendezvousDto } from './dto/create-rendezvous.dto';
import { UpdateRendezvousDto } from './dto/update-rendezvous.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorator/current-user';

@Controller('rendezvous')
export class RendezvousController {
  constructor(private readonly rendezvousService: RendezvousService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createRendezvousDto: CreateRendezvousDto,
         @CurrentUser() user: any,
) {

    return this.rendezvousService.create(createRendezvousDto, user.clientId);

  }

  @Get()
  findAll() {
    return this.rendezvousService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rendezvousService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRendezvousDto: UpdateRendezvousDto) {
    return this.rendezvousService.update(+id, updateRendezvousDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rendezvousService.remove(+id);
  }
}
