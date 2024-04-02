import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateStageDto } from './dto/create-stage.dto';
import { UpdateStageDto } from './dto/update-stage.dto';

@Injectable()
export class StagesService {
   constructor(private readonly prisma: PrismaService) {}

  async create(createStageDto: CreateStageDto) {
    try {
      const newStage = await this.prisma.stage.create({
        data: createStageDto,
      });
      return newStage;
    } catch (error) {
      console.error('Erreur lors de la création du stage :', error);
      throw error; // Vous pouvez remplacer cela par un type d'exception plus approprié si nécessaire
    }
  }

  findAll() {
    return this.prisma.stage.findMany();
  }

  async findOne(id: number) {
    const stage = await this.prisma.stage.findUnique({
      where: {
        id: id,
      },
    });

    if (!stage) {
      throw new NotFoundException(stage);
    }

    return stage;
  }

  async update(id: number, updateStageDto: UpdateStageDto) {
    try {
      const updatedStage = await this.prisma.stage.update({
        where: { id },
        data: updateStageDto,
      });
      return updatedStage;
    } catch (error) {
      console.error("Erreur lors de la mise à jour du stage :", error);
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const deleteStage = await this.prisma.stage.delete({
        where: { id: id },
      });

      return deleteStage;
    } catch (error) {
      console.error("Erreur lors de la suppression du stage :", error);
      throw error;
    }
  }
}
