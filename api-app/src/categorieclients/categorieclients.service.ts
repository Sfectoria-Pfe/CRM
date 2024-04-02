// categorieclients.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategorieclientDto } from './dto/create-categorieclient.dto';
import { UpdateCategorieclientDto } from './dto/update-categorieclient.dto';

@Injectable()
export class CategorieclientsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCategorieclientDto: CreateCategorieclientDto) {
    try {
      return await this.prisma.categorieClient.create({ data: createCategorieclientDto });
    } catch (error) {
      console.error('Erreur lors de la création de la catégorie client :', error);
      throw error;
    }
  }

  async findAll() {
    return await this.prisma.categorieClient.findMany();
  }

  async findOne(id: number) {
    const categorieClient = await this.prisma.categorieClient.findUnique({ where: { id } });
    if (!categorieClient) {
      throw new NotFoundException(`Catégorie client avec l'identifiant ${id} non trouvée`);
    }
    return categorieClient;
  }

  async update(id: number, updateCategorieclientDto: UpdateCategorieclientDto) {
    try {
      return await this.prisma.categorieClient.update({ where: { id }, data: updateCategorieclientDto });
    } catch (error) {
      console.error(`Erreur lors de la mise à jour de la catégorie client avec l'identifiant ${id}:`, error);
      throw error;
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.categorieClient.delete({ where: { id } });
    } catch (error) {
      console.error(`Erreur lors de la suppression de la catégorie client avec l'identifiant ${id}:`, error);
      throw error;
    }
  }
}
