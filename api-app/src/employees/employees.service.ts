import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Importez le service Prisma
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeesService {
  constructor(private prisma: PrismaService) {} // Injectez le service Prisma

  async create(createEmployeeDto: CreateEmployeeDto) {
    return await this.prisma.employee.create({
      data: createEmployeeDto, // Utilisez l'objet DTO pour créer un nouvel employé
    });
  }
  async findAllWithoutAccount() {
    const response = await this.prisma.employee.findMany({
      include: { user: { select: { email: true } } },
    });
    return response.filter((elem) => elem.user.length === 0);
  }

  async findAll() {
    return await this.prisma.employee.findMany(); // Retournez tous les employés
  }

  async findOne(id: number) {
    return await this.prisma.employee.findUnique({ where: { id } }); // Retournez un employé par ID
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    return await this.prisma.employee.update({
      where: { id },
      data: updateEmployeeDto, // Mettez à jour l'employé avec les données fournies dans le DTO de mise à jour
    });
  }

  async remove(id: number) {
    return await this.prisma.employee.delete({ where: { id } }); // Supprimez un employé par ID
  }
}
