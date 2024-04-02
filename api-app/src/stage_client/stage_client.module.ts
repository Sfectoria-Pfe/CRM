import { Module } from '@nestjs/common';
import { StageClientService } from './stage_client.service';
import { StageClientController } from './stage_client.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [StageClientController],
  providers: [StageClientService,PrismaService],
})
export class StageClientModule {}
