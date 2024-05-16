import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StageClientService } from './stage_client.service';
import { CreateStageClientDto } from './dto/create-stage_client.dto';
import { UpdateStageClientDto } from './dto/update-stage_client.dto';

@Controller('stage-client')
export class StageClientController {
  constructor(private readonly stageClientService: StageClientService) {}

  @Post()
  create(@Body() createStageClientDto: CreateStageClientDto) {
    return this.stageClientService.create(createStageClientDto);
  }

  @Get()
  findAll() {
    return this.stageClientService.findAll();
  }
  @Get('winned')
  findAllWinned() {
    return this.stageClientService.findAllWinned();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stageClientService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStageClientDto: UpdateStageClientDto) {
    return this.stageClientService.update(+id, updateStageClientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stageClientService.remove(+id);
  }
}
