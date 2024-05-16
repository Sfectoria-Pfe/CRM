import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateComentDto } from './dto/create-coment.dto';
import { UpdateComentDto } from './dto/update-coment.dto';

@Injectable()
export class ComentsService {
  constructor(private prisma: PrismaService) {} // Injectez le service Prisma

  async create(createComentDto: CreateComentDto) {
    return await this.prisma.comment.create({
      data: createComentDto, // Utilisez l'objet DTO pour créer un nouvel employé
    });
  }

  async findAll() {
    return await this.prisma.comment.findMany(); // Retournez tous les employés
  }

  async findOne(id: number) {
    return await this.prisma.comment.findUnique({ where: { id } }); // Retournez un employé par ID
  }

  async update(id: number,  updatepdateComentDto:  UpdateComentDto) {
    return await this.prisma.comment.update({
      where: { id },
      data:updatepdateComentDto , // Mettez à jour l'employé avec les données fournies dans le DTO de mise à jour
    });
  }

  async remove(id: number) {
    return await this.prisma.
    comment.delete({ where: { id } }); // Supprimez un employé par ID
  }
}
