import { Injectable } from '@nestjs/common';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class PromotionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreatePromotionDto) {

      let aux: any;
      aux={}
      Object.entries(dto).forEach(([key, value]) => {
        if (['date_debut', 'date_fin'].includes(key)) {
          console.log(aux,'here');

          aux[key] = new Date(value).toISOString();
          
        } else {
          aux[key] = value;
        }
      });
      console.log(aux);

      const newpromotion = await this.prisma.promotion.create({
        data: aux,
      });
      return newpromotion;
    
  }
  async findAll() {
    return await this.prisma.promotion.findMany(); // Utilisez Prisma pour récupérer tous les devis
  }

  async findOne(id: number) {
    return await this.prisma.promotion.findUnique({ where: { id } }); // Utilisez Prisma pour récupérer un devis par son ID
  }

  async update(id: number, updatepromotionDto: UpdatePromotionDto) {
    let aux = {};
    Object.entries(updatepromotionDto).forEach(([key, value]) => {
      if (['date_debut', 'date_fin'].includes(key)) {
        aux[key] = new Date(value).toISOString();
      } else {
        aux[key] = value;
      }
    });
    console.log(aux);

    return await this.prisma.promotion.update({
      where: { id },
      data: aux,
    });
  }

  async remove(id: number) {
    try {
      const deletepromotion = await this.prisma.promotion.delete({
        where: { id: id },
      });

      return deletepromotion;
    } catch (error) {
      console.error('Erreur lors de la suppression du promotion :', error);
      throw error;
    }
  }
}
