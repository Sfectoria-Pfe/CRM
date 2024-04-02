import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRendezvousDto } from './dto/create-rendezvous.dto';
import { UpdateRendezvousDto } from './dto/update-rendezvous.dto';

@Injectable()
export class RendezvousService {
  constructor(private readonly prisma: PrismaService) {} // Injectez le service Prisma dans le constructeur

  async create(createRendezvousDto: CreateRendezvousDto) {
    try {
      const newRendezvous = await this.prisma.rendezvous.create({
        data: createRendezvousDto, // Utiliser createRendezvousDto ici
      });
      return newRendezvous;
    } catch (error) {
      console.error('Erreur lors de la création du rendez-vous :', error);
      throw error;
    }
  }

  async findAll() {
    const rendezvous = await this.prisma.rendezvous.findMany();
    return rendezvous;
  }

  async findOne(id: number) {
    const rendezvous = await this.prisma.rendezvous.findUnique({
      where: { id },
    });
    if (!rendezvous) {
      throw new NotFoundException(`Rendezvous with ID ${id} not found`);
    }
    return rendezvous;
  }

  async update(id: number, updateRendezvousDto: UpdateRendezvousDto) {
    const updatedRendezvous = await this.prisma.rendezvous.update({
      where: { id },
      data: updateRendezvousDto,
    });
    return updatedRendezvous;
  }

  async remove(id: number) {
    const deletedRendezvous = await this.prisma.rendezvous.delete({
      where: { id },
    });
    return deletedRendezvous;
  }
}
