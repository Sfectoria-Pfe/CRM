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

  async findAll() {
    return await this.prisma.client.findMany();
  }

  async findOne(id: number) {
    const client = await this.prisma.client.findUnique({ where: { id } });
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
