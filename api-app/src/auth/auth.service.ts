import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto, SignupDto } from './dto/create-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from 'src/users/users.service';
import passport from 'passport';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  async loginEmployee(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
        isClient: false,
      },
      include: { Employee: true },
    });

    if (!user) {
      throw new HttpException('Invalid email', HttpStatus.UNAUTHORIZED);
    }

    const { password, ...rest } = user;

    const isPasswordValid = await bcrypt.compare(dto.password, password);
    if (typeof dto.password !== 'string' || dto.password.trim() === '') {
      throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);
    }

    const token = this.jwtService.sign(rest);
    return token;
  }
  async loginClient(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
        isClient: true,
      },
      include: { Client: true },
    });

    if (!user) {
      throw new HttpException('Invalid email', HttpStatus.UNAUTHORIZED);
    }

    const { password, ...rest } = user;

    const isPasswordValid = await bcrypt.compare(dto.password, password);
    if (typeof dto.password !== 'string' || dto.password.trim() === '') {
      throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);
    }

    const token = this.jwtService.sign(rest);
    return token;
  }
  async signupClient(dto: SignupDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
        isClient: true,
      },
    });

    if (user) {
      throw new HttpException('Invalid email', HttpStatus.UNAUTHORIZED);
    }
    const client = await this.prisma.client.findUnique({
      where: { email: dto.email },
    });
    if (client) {
      const newUser = await this.userService.create({
        email: dto.email,
        password: dto.password,
        isClient: true,
        clientId: client.id,
      });

      return {
        message: 'user client created successfully',
      };
    } else {
      const { password, ...rest } = dto;
      const newClient = await this.prisma.client.create({
        data: { ...rest },
      });
      const newUser = await this.userService.create({
        email: dto.email,
        password: dto.password,
        isClient: true,
        clientId: newClient.id,
      });
    }
    return {
      message: 'user client created successfully',
    };
  }

  async getMyInfo(token: string) {
    try {
      const decodedToken = this.jwtService.verify(token);
      return decodedToken;
    } catch (error) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
  }
  async updateMe(dto: UpdateAuthDto, id: number) {
    if (dto.password) {
      throw new HttpException("u can't touch password", HttpStatus.BAD_REQUEST);
    }
    if (dto.email) {
      const user = await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });
      if (user) {
        throw new HttpException('invalid email', HttpStatus.BAD_REQUEST);
      }
    }
    const user = await this.prisma.user.update({
      where: { id: id },
      data: dto,
    });
    const { password, ...rest } = user;
    const token = this.jwtService.sign(rest);
    return token;
  }
}

// findAll() {
//   return This action returns all auth;
// }

// findOne(id: number) {
//   return This action returns a #${id} auth;
// }

// update(id: number, updateAuthDto: UpdateAuthDto) {
//   return This action updates a #${id} auth;
// }

// remove(id: number) {
//   return This action removes a #${id} auth;
// }
