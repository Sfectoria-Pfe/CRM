import { Injectable } from '@nestjs/common';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class PromotionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createpromotionDto: CreatePromotionDto) {
    try {
      const newpromotion = await this.prisma.promotion.create({
        data: createpromotionDto,
      });
      return newpromotion;
    } catch (error) {
      console.error('Erreur lors de la création de la promotion :', error);
      throw error;
    }
  }
  async findAll() {
    return await this.prisma.promotion.findMany(); // Utilisez Prisma pour récupérer tous les devis
  }

  async findOne(id: number) {
    return await this.prisma.promotion.findUnique({ where: { id } }); // Utilisez Prisma pour récupérer un devis par son ID
  }

  async update(id: number, updatepromotionDto: UpdatePromotionDto) {
    try {
      return await this.prisma.promotion.update({
        where: { id },
        data: updatepromotionDto,
      });
    } catch (error) {
      console.error('Erreur lors de la mise à jour du promotion :', error);
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const deletepromotion = await this.prisma.promotion.delete({
        where: { id: id },
      });

      return deletepromotion;
    } catch (error) {
      console.error("Erreur lors de la suppression du promotion :", error);
      throw error;
    }
  }
}