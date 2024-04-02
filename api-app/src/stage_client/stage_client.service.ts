import { Injectable,NotFoundException  } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Assurez-vous d'importer correctement votre service Prisma
import { CreateStageClientDto } from './dto/create-stage_client.dto';
import { UpdateStageClientDto } from './dto/update-stage_client.dto';

@Injectable()
export class StageClientService {
  constructor(private readonly prisma: PrismaService) {} // Injection du service Prisma

  async create(createStageClientDto: CreateStageClientDto) {
    try {
      const newStage = await this.prisma.stage_Client.create({
        data: createStageClientDto,
      });
      return newStage;
    } catch (error) {
      console.error('Erreur lors de la création du stage client :', error);
      throw error; // Vous pouvez remplacer cela par un type d'exception plus approprié si nécessaire
    }
  }

  async findAll() {
    return await this.prisma.stage_Client.findMany();
  }

  async findOne(id: number) {
    const stageClient = await this.prisma.stage_Client.findUnique({
      where: { id },
    });
    if (!stageClient) {
      throw new NotFoundException(`Le stage client avec l'ID ${id} n'a pas été trouvé`);
    }
    return stageClient;
  }

  async update(id: number, updateStageClientDto: UpdateStageClientDto) {
    try {
      const updatedStageClient = await this.prisma.stage_Client.update({
        where: { id },
        data: updateStageClientDto,
      });
      return updatedStageClient;
    } catch (error) {
      console.error(`Erreur lors de la mise à jour du stage client avec l'ID ${id} :`, error);
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const deletedStageClient = await this.prisma.stage_Client.delete({
        where: { id },
      });
      return deletedStageClient;
    } catch (error) {
      console.error(`Erreur lors de la suppression du stage client avec l'ID ${id} :`, error);
      throw error;
    }
  }
}
