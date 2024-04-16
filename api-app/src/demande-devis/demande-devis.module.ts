import { Module } from '@nestjs/common';
import { DemandeDevisService } from './demande-devis.service';
import { DemandeDevisController } from './demande-devis.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [DemandeDevisController],
  providers: [DemandeDevisService,PrismaService],
})
export class DemandeDevisModule {}
