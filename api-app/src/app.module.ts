import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrisamaModule } from './prisama/prisama.module';
import { PrismaService } from './prisma/prisma.service';
import { ServicesModule } from './services/services.module';
import { AuthModule } from './auth/auth.module';
import { VentesModule } from './ventes/ventes.module';
import { LocationsModule } from './locations/locations.module';
import { ClientsModule } from './clients/clients.module';
import { CategorieclientsModule } from './categorieclients/categorieclients.module';
import { DevisModule } from './devis/devis.module';
import { RendezvousModule } from './rendezvous/rendezvous.module';
import { ChefModule } from './chef/chef.module';
import { CommercialeModule } from './commerciale/commerciale.module';
import { EquipecommercialeModule } from './equipecommerciale/equipecommerciale.module';
import { OpportunitesModule } from './opportunites/opportunites.module';
import { StagesModule } from './stages/stages.module';
import { StageClientModule } from './stage_client/stage_client.module';

@Module({
  imports: [UsersModule, PrisamaModule, ServicesModule, AuthModule, VentesModule, LocationsModule, ClientsModule, CategorieclientsModule, DevisModule, RendezvousModule, ChefModule, CommercialeModule, EquipecommercialeModule, OpportunitesModule, StagesModule, StageClientModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
