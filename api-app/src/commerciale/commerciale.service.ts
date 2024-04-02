import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommercialeDto } from './dto/create-commerciale.dto';
import { UpdateCommercialeDto } from './dto/update-commerciale.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt'; // Importez bcrypt

@Injectable()
export class CommercialeService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCommercialeDto: CreateCommercialeDto) {
    try {
      const { password, ...rest } = createCommercialeDto;
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      
      const newcommerciale = await this.prisma.commerciale.create({
        data: { password: hashedPassword, ...rest },
      });
      return newcommerciale;
    } catch (error) {
      console.error('Erreur lors de la création du commercial :', error);
      throw error; // Vous pouvez remplacer cela par un type d'exception plus approprié si nécessaire
    }
  }

  findAll() {
    return this.prisma.commerciale.findMany();
  }

  async findOne(id: number) {
    const commerciale = await this.prisma.commerciale.findUnique({
      where: {
        id: id,
      },
    });

    if (!commerciale) {
      throw new NotFoundException(commerciale);
    }

    return commerciale;
  }

  async update(id: number, updatecommercialeDto:  UpdateCommercialeDto) {
    try {
      return await this.prisma.commerciale.update({
        where: { id },
        data: updatecommercialeDto,
      });
    } catch (error) {
      console.error('Erreur lors de la mise à jour du commerciale:', error);
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const deletecommerciale = await this.prisma.commerciale.delete({
        where: { id: id },
      });

      return deletecommerciale;
    } catch (error) {
      console.error("Erreur lors de la suppression du commerciale :", error);
      throw error;
    }
  }
}