import { Injectable } from '@nestjs/common';
import { CreateDeviDto } from './dto/create-devi.dto';
import { UpdateDeviDto } from './dto/update-devi.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DevisService {    
  
  constructor(private readonly prisma: PrismaService) {}

  async create(createdevisDto: CreateDeviDto) {
    try {
      const newdevis = await this.prisma.devis.create({
        data: createdevisDto,
      });
      return newdevis;
    } catch (error) {
      console.error('Erreur lors de la création de la devis :', error);
      throw error;
    }
  }
  async findAll() {
    return await this.prisma.devis.findMany(); // Utilisez Prisma pour récupérer tous les devis
  }

  async findOne(id: number) {
    return await this.prisma.devis.findUnique({ where: { id } }); // Utilisez Prisma pour récupérer un devis par son ID
  }

  async update(id: number, updatedevisDto:  UpdateDeviDto) {
    try {
      return await this.prisma.devis.update({
        where: { id },
        data: updatedevisDto,
      });
    } catch (error) {
      console.error('Erreur lors de la mise à jour du devis :', error);
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const deleteddevis = await this.prisma.devis.delete({
        where: { id: id },
      });

      return deleteddevis;
    } catch (error) {
      console.error("Erreur lors de la suppression du devis :", error);
      throw error;
    }
  }
}