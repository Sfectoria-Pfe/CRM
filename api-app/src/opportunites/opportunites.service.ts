import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOpportuniteDto } from './dto/create-opportunite.dto';
import { UpdateOpportuniteDto } from './dto/update-opportunite.dto';

@Injectable()
export class OpportunitesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createOpportuniteDto: CreateOpportuniteDto) {
    try {
      const newOpportunite = await this.prisma.opportunite.create({
        data: createOpportuniteDto,
      });
      return newOpportunite;
    } catch (error) {
      console.error("Erreur lors de la création de l'opportunité :", error);
      throw error;
    }
  }

  async findAll(numberService: number) {
    const opportunites = await this.prisma.opportunite.findMany({
      include: {
        service_Opportunites: {include:{Service:true}},
        promotion: { include: { CategorieClient: true } },
      },
    });
    //console.log(numberService, typeof numberService);

    if (numberService === 1) {
      return opportunites.filter(
        (elem) => (elem.service_Opportunites.length = numberService),
      );
    } else {
      return opportunites.filter(
        (elem) => elem.service_Opportunites.length > numberService,
      );
    }
  }

  async findOne(id: number) {
    return await this.prisma.opportunite.findUnique({
      where: { id },
      include: {
        stage: {
          include: {
            StageClient: { include: { Client: true, Comment: true } },
          },
        },
      },
    });
  }

  async update(id: number, UpdateOpportuniteDto: UpdateOpportuniteDto) {
    try {
      return await this.prisma.opportunite.update({
        where: { id },
        data: UpdateOpportuniteDto,
      });
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'opportunité :", error);
      throw error;
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.opportunite.delete({
        where: { id },
      });
      return `L'opportunité avec l'ID ${id} a été supprimée avec succès.`;
    } catch (error) {
      console.error("Erreur lors de la suppression de l'opportunité :", error);
      throw error;
    }
  }
}
