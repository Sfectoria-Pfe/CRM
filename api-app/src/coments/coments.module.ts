import { Module } from '@nestjs/common';
import { ComentsService } from './coments.service';
import { ComentsController } from './coments.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ComentsController],
  providers: [ComentsService,PrismaService],
})
export class ComentsModule {}
