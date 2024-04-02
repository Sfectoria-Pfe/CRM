import { Module } from '@nestjs/common';
import { ChefService } from './chef.service';
import { ChefController } from './chef.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ChefController],
  providers: [ChefService,PrismaService],
})
export class ChefModule {}
