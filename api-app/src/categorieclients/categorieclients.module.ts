import { Module } from '@nestjs/common';
import { CategorieclientsService } from './categorieclients.service';
import { CategorieclientsController } from './categorieclients.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [CategorieclientsController],
  providers: [CategorieclientsService,PrismaService],
})
export class CategorieclientsModule {}
