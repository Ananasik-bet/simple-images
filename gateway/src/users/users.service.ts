import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { Role, User } from '@prisma/client';
import { hash } from 'argon2';
import { UserDto } from './dto/user.dto';
import { GetListQueryDto } from './dto/user-query.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async getById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async findAll(options: GetListQueryDto): Promise<User[]> {
    const extraSearch: any = {};

    if (options.email) {
      extraSearch.name = {
        contains: options.email,
        mode: 'insensitive',
      };
    }

    return this.prisma.user.findMany({
      where: { ...extraSearch },
      include: {
        images: true,
      },
      orderBy: {
        images: {
          _count: 'desc',
        },
      },
      take: options.limit,
      skip: (options.page - 1) * options.limit,
    });
  }

  async remove(id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }

  async getByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async create(dto: AuthDto) {
    return this.prisma.user.create({
      data: {
        email: dto.email,
        name: dto.name,
        role: dto.role ? dto.role : Role.USER,
        password: await hash(dto.password),
      },
    });
  }

  async update(id: string, dto: UserDto) {
    let data = dto;

    if (dto.password) {
      data = { ...dto, password: await hash(dto.password) };
    }

    return this.prisma.user.update({
      where: { id },
      data,
    });
  }
}
