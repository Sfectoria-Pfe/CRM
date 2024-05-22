import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Assurez-vous d'importer le service Prisma
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class ClientsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateClientDto) {
    try {
      const newClient = await this.prisma.client.create({
        data: dto,
      });
      return newClient;
    } catch (error) {
      console.error('Erreur lors de la création du client :', error);
      throw error; // Vous pouvez remplacer cela par un type d'exception plus approprié si nécessaire
    }
  }

  async findAll(filter: any) {
    let where = {};
    if (filter.fullNameEn) {
      where['OR'] = [
        { nom: { contains: filter.fullNameEn } },
        { prenom: { contains: filter.fullNameEn } },
      ];
    }
    return await this.prisma.client.findMany({ where ,include:{categorie:true}});
  }
  async findAllWithoutAccount() {
    const response = await this.prisma.client.findMany({
      include: { user: { select: { email: true } } },
    });
    return response.filter((elem) => elem.user.length === 0);
  }
  

  async findOne(id: number) {
    const client = await this.prisma.client.findUnique({
      where: { id },
      include: {
        stages: {
          orderBy: {
            Stage: {
              opportuniteId: 'asc',
            },
          },
          include: {
            Stage: {
              include: {
                Opportunite: {
                  include: {
                    service_Opportunites: { include: { Service: true } },
                  },
                },
              },
            },
            Comment: true,
          },
        },
      },
    });
    return client;
  }

  async update(id: number, updateClientDto: UpdateClientDto) {
    return await this.prisma.client.update({
      where: { id },
      data: updateClientDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.client.delete({ where: { id } });
  }
}
