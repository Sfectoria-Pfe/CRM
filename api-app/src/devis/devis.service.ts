import { Injectable } from '@nestjs/common';
import { CreateDeviDto } from './dto/create-devi.dto';
import { UpdateDeviDto } from './dto/update-devi.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DevisService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createdevisDto: CreateDeviDto) {
    const { items, ...rest } = createdevisDto;
    try {
      const currentDate = rest.currentDate instanceof Date ? rest.currentDate.toISOString() : new Date().toISOString();
      const dateOfIssue = rest.dateOfIssue instanceof Date ? rest.dateOfIssue.toISOString() : new Date().toISOString();

      const newdevis = await this.prisma.devis.create({
        data: {
          ...rest,
          currentDate,
          dateOfIssue,
          devisLine: {
            create: items.map((item) => ({
              serviceId: 1,
              qunatity: +item.quantity,
              prix_unitaire: +item.price,
            })),
          },
        },
      });
      return newdevis;
    } catch (error) {
      console.error('Erreur lors de la création de la devis :', error);
      throw error;
    }
}
  async findAll() {
    return await this.prisma.devis.findMany();
  }

  async findMyDevis(id: number) {
    return await this.prisma.devis.findMany({
      where: {
        clientId: id,
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.devis.findUnique({
      where: { id },
      include: { client: true, devisLine: true }
    });
  }

  async update(id: number, updateDeviDto: UpdateDeviDto) {
    try {
      return await this.prisma.devis.update({
        where: { id },
        data: updateDeviDto,
      });
    } catch (error) {
      console.error('Error updating quote:', error);
      throw new Error('Error updating quote: ' + error.message);
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.devis.delete({
        where: { id },
      });
    } catch (error) {
      console.error('Error deleting quote:', error);
      throw new Error('Error deleting quote: ' + error.message);
    }
  }
}
