import { Module } from '@nestjs/common';
import { CommercialeService } from './commerciale.service';
import { CommercialeController } from './commerciale.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [CommercialeController],
  providers: [CommercialeService,PrismaService],
})
export class CommercialeModule {}
