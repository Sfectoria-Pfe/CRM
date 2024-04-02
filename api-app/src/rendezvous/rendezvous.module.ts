import { Module } from '@nestjs/common';
import { RendezvousService } from './rendezvous.service';
import { RendezvousController } from './rendezvous.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [RendezvousController],
  providers: [RendezvousService,PrismaService],
})
export class RendezvousModule {}
