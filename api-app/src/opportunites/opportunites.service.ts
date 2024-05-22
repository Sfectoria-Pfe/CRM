import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOpportuniteDto } from './dto/create-opportunite.dto';
import { UpdateOpportuniteDto } from './dto/update-opportunite.dto';

@Injectable()
export class OpportunitesService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createOpportuniteDto: CreateOpportuniteDto) {
    const { serviceIds, ...rest } = createOpportuniteDto;
    const newOpportunite = await this.prisma.opportunite.create({
      data: {
        ...rest,
        service_Opportunites: {
          create: serviceIds.map((elem) => ({
            serviceId: elem,
            isPromotion: false,
            prix: 500,
            discountAmout: 10,
          })),
        },
      },
    });
    return newOpportunite;
  }

  async findAll(numberService: number) {
    const opportunites = await this.prisma.opportunite.findMany({
      include: {
        service_Opportunites: { include: { Service: true } },
        promotion: { include: { CategorieClient: true } },
      },
    });
    console.log(numberService, typeof numberService);

    if (numberService) {
      if (numberService === 1) {
        return opportunites.filter(
          (elem) => elem.service_Opportunites.length === numberService,
        );
      } else if (numberService > 1) {
        return opportunites.filter(
          (elem) => elem.service_Opportunites.length != 1,
        );
      }
    } else {
      return opportunites;
    }
  }


  async findAllWithCommercial(id: number) {
    return await this.prisma.opportunite.findMany({
      where: {
        equipe: {
          Member: {
            some: {
              employee: {
                id: id
              }
            }
          }
        }
      }
    })
  }

  async findOne(
    id: number,
    // equipeId:number
  ) {
    const opportunity = await this.prisma.opportunite.findUnique({
      where: {
        id,
        // stage: { some: { StageClient: { some: { archived: false } } } },
      },
      include: {
        promotion: { include: { CategorieClient: true } },
        stage: {
          include: {
            StageClient: { include: { Client: true, Comment: true } },
          },
        },
        service_Opportunites: {
          include: {
            Service: true,
          },
        },
      },
    });
    //if equipeId===opportunity.equipeId{
    // return opportunity else {
    //    throw error
    //}
    // }
    return opportunity;
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
