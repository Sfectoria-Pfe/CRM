import { Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ServicesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createServiceDto: CreateServiceDto) {
    // try {
    //   const newService = await this.prisma.service.create({
    //     data: createServiceDto,
    //   });
    //   return newService;
    // } catch (error) {
    //   console.error('Erreur lors de la création du service :', error);
    //   throw error;
    // }
  }

  async findAll() {
    // return await this.prisma.service.findMany();
  }

  async findOne(id: number) {
    // return await this.prisma.service.findUniqueOrThrow({ where: { id } });
  }

  async update(id: number, updateServiceDto: UpdateServiceDto) {
    // try {
    //   const updatedService = await this.prisma.service.update({
    //     where: { id },
    //     data: updateServiceDto,
    //   });
    //   return updatedService;
    // } catch (error) {
    //   console.error('Erreur lors de la mise à jour du service :', error);
    //   throw error;
    // }
  }

  async remove(id: number) {
    // try {
    //   await this.prisma.service.delete({ where: { id } });
    //   return `Le service avec l'ID ${id} a été supprimé avec succès.`;
    // } catch (error) {
    //   console.error('Erreur lors de la suppression du service :', error);
    //   throw error;
    // }
  }
}
