import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';

@Injectable()
export class LocationsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createLocationDto: CreateLocationDto) {
    try {
        const { date_debut, date_fin, ...otherData } = createLocationDto;
        
        // Convertir les dates de début et de fin en format ISO-8601 DateTime
        const isoDateDebut = new Date(date_debut).toISOString();
        const isoDateFin = new Date(date_fin).toISOString();

        const newLocation = await this.prisma.location.create({
            data: {
                ...otherData,
                date_debut: isoDateDebut,
                date_fin: isoDateFin,
            },
        });
        return newLocation;
    } catch (error) {
        console.error('Erreur lors de la création de la location :', error);
        throw error;
    }
}
  findAll() {
    return this.prisma.location.findMany({});
  }

  async findOne(id: number) {
    const location = await this.prisma.location.findUnique({
      where: {
        id: id,
      },
    });

    if (!location) {
      throw new NotFoundException(`Location with id ${id} not found`);
    }

    return location;
  }

  async update(id: number, updateLocationDto: UpdateLocationDto) {
    try {
      const updatedLocation = await this.prisma.location.update({
        where: { id: id },
        data: updateLocationDto,
      });
      
      return updatedLocation;
    } catch (error) {
      console.error(`Erreur lors de la mise à jour de la location avec l'identifiant ${id}:`, error);
      throw error;
    }
  }
  
  async remove(id: number) {
    try {
      const deletedLocation = await this.prisma.location.delete({
        where: { id: id },
      });
      
      return deletedLocation;
    } catch (error) {
      console.error(`Erreur lors de la suppression de la location avec l'identifiant ${id}:`, error);
      throw error;
    }
  }
}
