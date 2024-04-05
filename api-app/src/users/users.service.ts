import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  async create(dto: CreateUserDto) {
    const { password, ...rest } = dto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    return this.prisma.user.create({
      data: { password: hashedPassword, ...rest },
    });
  }

  findAll() {
    return this.prisma.user.findMany({});
  }

  findOne(id: number) {
    return this.prisma.user.findUnique;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update;
  }

  async remove(id: number) {
    try {
       await this.prisma.user.delete({ where: { id } });
       return `Le service avec l'ID ${id} a été supprimé avec succès.`;
     } catch (error) {
       console.error('Erreur lors de la suppression du service :', error);
       throw error;
     
     }

}}