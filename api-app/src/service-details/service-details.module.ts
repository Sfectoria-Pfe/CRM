import { Module } from '@nestjs/common';
import { ServiceDetailsService } from './service-details.service';
import { ServiceDetailsController } from './service-details.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ServiceDetailsController],
  providers: [ServiceDetailsService,PrismaService],
})
export class ServiceDetailsModule {}
