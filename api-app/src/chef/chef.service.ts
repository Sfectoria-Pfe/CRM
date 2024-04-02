import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateChefDto } from './dto/create-chef.dto';
import { UpdateChefDto } from './dto/update-chef.dto';
import * as bcrypt from 'bcrypt'; // Importez bcrypt

@Injectable()
export class ChefService {
   constructor(private readonly prisma: PrismaService) {}

   async create(createChefDto: CreateChefDto) {
    try {
      const { password, ...rest } = createChefDto;
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      
      const newChef = await this.prisma.chef.create({
        data: { password: hashedPassword, ...rest },
      });
      return newChef;
    } catch (error) {
      console.error('Erreur lors de la création du chef :', error);
      throw error; // Vous pouvez remplacer cela par un type d'exception plus approprié si nécessaire
    }
  }

  findAll() {
    return this.prisma.chef.findMany();
  }

  async findOne(id: number) {
    const chef = await this.prisma.chef.findUnique({
      where: {
        id: id,
      },
    });

    if (!chef) {
      throw new NotFoundException(chef);
    }

    return chef;
  }

  async update(id: number, updatechefDto:  UpdateChefDto) {
    try {
      return await this.prisma.chef.update({
        where: { id },
        data: updatechefDto,
      });
    } catch (error) {
      console.error('Erreur lors de la mise à jour du chef :', error);
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const deletechef = await this.prisma.chef.delete({
        where: { id: id },
      });

      return deletechef;
    } catch (error) {
      console.error("Erreur lors de la suppression du chef :", error);
      throw error;
    }
  }
}
