import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service'; // Assurez-vous du bon chemin d'accès
import { CreateVenteDto } from './dto/create-vente.dto';
import { UpdateVenteDto } from './dto/update-vente.dto';
import { validate } from 'class-validator';

@Injectable()
export class VentesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(CreateVenteDto: CreateVenteDto) {
    try {
      const newVente = await this.prisma.vente.create({
        data: CreateVenteDto,
      });
      return newVente;
    } catch (error) {
      console.error('Erreur lors de la création du service :', error);
      throw error;
        }
  }



  findAll() {
    return this.prisma.vente.findMany({});
  }

  async findOne(id: number) {
    // Utilisez le service Prisma pour rechercher la vente avec l'identifiant spécifié
    const vente = await this.prisma.vente.findUnique({
      where: {
        id: id,
      },
    });

    // Vérifiez si la vente a été trouvée
    if (!vente) {
      // Si la vente n'est pas trouvée, lancez une exception NotFoundException
      throw new NotFoundException(`Vente with id ${id} not found`);
    }

    // Si la vente est trouvée, retournez-la
    return vente;
  }

  async update(id: number, updateVenteDto: UpdateVenteDto) {
    try {
      // Utilisez le service Prisma pour mettre à jour la vente avec l'identifiant spécifié
      const updatedVente = await this.prisma.vente.update({
        where: { id: id }, // Spécifiez l'identifiant de la vente à mettre à jour
        data: updateVenteDto, // Utilisez les données fournies dans l'objet updateVenteDto
      });
      
      // Retournez la vente mise à jour
      return updatedVente;
    } catch (error) {
      // Gérez les erreurs éventuelles
      console.error(`Erreur lors de la mise à jour de la vente avec l'identifiant ${id}:`, error);
      throw error;
    }
  }
  
  async remove(id: number) {
    try {
      // Utilisez le service Prisma pour supprimer la vente avec l'identifiant spécifié
      const deletedVente = await this.prisma.vente.delete({
        where: { id: id }, // Spécifiez l'identifiant de la vente à supprimer
      });
      
      // Retournez la vente supprimée
      return deletedVente;
    } catch (error) {
      // Gérez les erreurs éventuelles
      console.error(`Erreur lors de la suppression de la vente avec l'identifiant ${id}:`, error);
      throw error;
    }
  }
  
}
