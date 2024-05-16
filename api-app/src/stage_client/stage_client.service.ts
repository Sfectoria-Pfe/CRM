import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Assurez-vous d'importer correctement votre service Prisma
import { CreateStageClientDto } from './dto/create-stage_client.dto';
import { UpdateStageClientDto } from './dto/update-stage_client.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class StageClientService {
  constructor(private readonly prisma: PrismaService) {} // Injection du service Prisma

  async create(createStageClientDto: CreateStageClientDto) {
    try {
      const opportunity = await this.prisma.opportunite.findMany({
        where: { stage: { some: { id: createStageClientDto.stageId } } },
      });
      console.log(opportunity);

      const stagesClient = await this.prisma.stageClient.findMany({
        where: {
          clientId: createStageClientDto.clientId,
          archived: false,
          Stage: { opportuniteId: opportunity[0].id },
        },
      });

      if (stagesClient.length) {
        throw new BadRequestException(
          "you can't create more than one client no archived by opportunity",
        );
      } else {
        const newStage = await this.prisma.stageClient.create({
          data: createStageClientDto,
        });
        return newStage;
      }
    } catch (error) {
      console.error('Erreur lors de la création du stage client :', error);
      throw error; // Vous pouvez remplacer cela par un type d'exception plus approprié si nécessaire
    }
  }

  async findAll() {
    return await this.prisma.stageClient.findMany();
  }
  async findAllWinned() {
    const winnedStageClients =await this.prisma.stageClient.findMany({
      where: {
        win: true ,
        archived:true// Assuming 'win' is a boolean column
      }
    });
    console.log(winnedStageClients);
    return winnedStageClients;
  }

  async findOne(id: number) {
    const stageClient = await this.prisma.stageClient.findUnique({
      where: { id },
    });
    if (!stageClient) {
      throw new NotFoundException(
        `Le stage client avec l'ID ${id} n'a pas été trouvé`,
      );
    }
    return stageClient;
  }

  async update(id: number, updateStageClientDto: UpdateStageClientDto) {
    try {
      return await this.prisma.$transaction(
        async (prisma: Prisma.TransactionClient) => {
          const updatedStageClient = await prisma.stageClient.update({
            where: { id },
            data: { archived: true },
          });
          return await prisma.stageClient.create({
            data: {
              stageId: updateStageClientDto.stageId,
              clientId: updatedStageClient.clientId,
              description: updatedStageClient.description,
            },
          });
        },
      );
    } catch (error) {
      console.error(
        `Erreur lors de la mise à jour du stage client avec l'ID ${id} :`,
        error,
      );
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const deletedStageClient = await this.prisma.stageClient.delete({
        where: { id },
      });
      return deletedStageClient;
    } catch (error) {
      console.error(
        `Erreur lors de la suppression du stage client avec l'ID ${id} :`,
        error,
      );
      throw error;
    }
  }
}
