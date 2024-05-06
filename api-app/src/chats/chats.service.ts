import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChatsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createChatDto: CreateChatDto) {
    return await this.prisma.msgsClient.create({
      data: createChatDto,
      include: {
        Sender: { select: { Client: true, isClient: true, Employee: true } },
      },
    });
  }

  async findAllByOpportunity(opportunityId: number) {
    let response = await this.prisma.msgsClient.groupBy({
      by: ['senderId'],
      where: {
        opportunityId,
        OR: [{ Sender: { isClient: true } }],
      },
      _count: {
        content: true,
      },
    });
    return await Promise.all(
      response.map(async (elem) => {
        return {
          ...elem,
          ...(await this.prisma.user.findUnique({
            where: { id: elem.senderId },
            select: { id: true, Client: true },
          })),
        };
      }),
    );
  }

  async findMsgsOpportunityClient(opportunityId: number, clientId: number) {
    return await this.prisma.msgsClient.findMany({
      where: {
        opportunityId,
        OR: [{ senderId: clientId }, { receiverId: clientId }],
      },
      include: {
        Sender: { select: { Client: true, isClient: true, Employee: true } },
      },
    });
  }

  async findManager(opportunityId: number) {
    return await this.prisma.opportunite.findUnique({
      where: { id: opportunityId },
      include: {
        equipe: {
          include: {
            chef: {
              include: { user: true },
            },
          },
        },
      },
    });
  }
  update(id: number, updateChatDto: UpdateChatDto) {
    return `This action updates a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
