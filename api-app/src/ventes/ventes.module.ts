import { Module } from '@nestjs/common';
import { VentesService } from './ventes.service';
import { VentesController } from './ventes.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [VentesController],
  providers: [VentesService,PrismaService],
})
export class VentesModule {}
