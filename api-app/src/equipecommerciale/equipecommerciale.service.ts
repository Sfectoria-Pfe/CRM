import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEquipecommercialeDto } from './dto/create-equipecommerciale.dto';
import { UpdateEquipecommercialeDto } from './dto/update-equipecommerciale.dto';

@Injectable()
export class EquipecommercialeService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createEquipecommercialeDto: CreateEquipecommercialeDto) {
    try {
      const newEquipecommerciale = await this.prisma.equipe.create({
        data: createEquipecommercialeDto,
      });
      return newEquipecommerciale;
    } catch (error) {  
      console.error('Erreur lors de la création d\'une nouvelle équipe commerciale :', error);
      throw error;
    }
  }   
  async findAll() {
    return await this.prisma.equipe.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.equipe.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateEquipecommercialeDto: UpdateEquipecommercialeDto) {
    try {
      const updatedEquipecommerciale = await this.prisma.equipe.update({
        where: { id },
        data: updateEquipecommercialeDto,
      });
      return updatedEquipecommerciale;
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'équipe commerciale :', error);
      throw error;
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.equipe.delete({ where: { id } });
      return `L'équipe commerciale avec l'ID ${id} a été supprimée avec succès.`;
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'équipe commerciale :', error);
      throw error;
    }
  }
}
