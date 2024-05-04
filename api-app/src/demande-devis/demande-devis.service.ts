import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDemandeDeviDto } from './dto/create-demande-devi.dto';
import { UpdateDemandeDeviDto } from './dto/update-demande-devi.dto';

@Injectable()
export class DemandeDevisService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createDemandeDeviDto: CreateDemandeDeviDto,clientId:number) {  
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString(); // Utiliser la date actuelle au format ISO-8601 DateTime

    const demandeDevi = await this.prismaService.demandeDevis.create({
      data: {
        dateDemande: formattedDate,
        description: createDemandeDeviDto.description,
        sujet: createDemandeDeviDto.sujet,
        clientId,
      }
    });

    return demandeDevi;
  }


  async findAll() {
    const demandeDevis = await this.prismaService.demandeDevis.findMany();
    return demandeDevis;
  }

  async findOne(id: number) {
    const demandeDevi = await this.prismaService.demandeDevis.findUnique({
      where: { id },
    });
    if (!demandeDevi) {
      throw new NotFoundException(`Demande de devis avec l'id ${id} introuvable`);
    }
    return demandeDevi;
  }

  async update(id: number, updateDemandeDeviDto: UpdateDemandeDeviDto) {
    const updatedDemandeDevi = await this.prismaService.demandeDevis.update({
      where: { id },
      data: updateDemandeDeviDto,
    });
    return updatedDemandeDevi;
  }

  async remove(id: number) {
    const demandeDevi = await this.findOne(id); // Vérifie si la demande existe
    const deletedDemandeDevi = await this.prismaService.demandeDevis.delete({
      where: { id },
    });
    return demandeDevi;
  }
}
