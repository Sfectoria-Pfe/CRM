import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrisamaModule } from './prisama/prisama.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [UsersModule, PrisamaModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
