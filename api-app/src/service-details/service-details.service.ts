import { Injectable } from '@nestjs/common';
import { CreateServiceDetailDto } from './dto/create-service-detail.dto';
import { UpdateServiceDetailDto } from './dto/update-service-detail.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ServiceDetailsService {    
  
  constructor(private readonly prisma: PrismaService) {}

  async create(createServiceDetailDto: CreateServiceDetailDto) {
    try {
      const newServiceDetail = await this.prisma.serviceDetail.create({
        data: createServiceDetailDto,
      });
      return newServiceDetail;
    } catch (error) {
      console.error('Erreur lors de la création du détail du service :', error);
      throw error;
    }
  }

  async findAll() {
    return await this.prisma.serviceDetail.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.serviceDetail.findUnique({ where: { id } });
  }

  async update(id: number, updateServiceDetailDto: UpdateServiceDetailDto) {
    try {
      return await this.prisma.serviceDetail.update({
        where: { id },
        data: updateServiceDetailDto,
      });
    } catch (error) {
      console.error('Erreur lors de la mise à jour du détail du service :', error);
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const deletedServiceDetail = await this.prisma.serviceDetail.delete({
        where: { id },
      });
      return deletedServiceDetail;
    } catch (error) {
      console.error("Erreur lors de la suppression du détail du service :", error);
      throw error;
    }
  }
}
