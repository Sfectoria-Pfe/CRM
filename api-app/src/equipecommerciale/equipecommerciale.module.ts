import { Module } from '@nestjs/common';
import { EquipecommercialeService } from './equipecommerciale.service';
import { EquipecommercialeController } from './equipecommerciale.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [EquipecommercialeController],
  providers: [EquipecommercialeService,PrismaService],
})
export class EquipecommercialeModule {}
