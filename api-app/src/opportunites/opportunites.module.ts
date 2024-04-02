import { Module } from '@nestjs/common';
import { OpportunitesService } from './opportunites.service';
import { OpportunitesController } from './opportunites.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [OpportunitesController],
  providers: [OpportunitesService,PrismaService
  ],
})
export class OpportunitesModule {}
