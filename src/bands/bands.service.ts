import { ConnectionArgs } from 'src/page/connection-args.dto';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Profile } from 'src/profile/entities/profile.dto';
import { CreateBandDto } from './dto/create-band.dto';
import { UpdateBandDto } from './dto/update-band.dto';

@Injectable()
export class BandsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(userAuth: Profile, createBandDto: CreateBandDto) {
    return await this.prismaService.band.create({
      data: {
        ...createBandDto,
        members: {
          connect: [{ id: userAuth.id }],
        },
      },
      include: {
        members: {
          select: {
            id: true,
            name: true,
            username: true,
            bio: true,
            imageUrl: true,
          },
        },
      },
    });
  }

  async findAll(userAuth: Profile, connectionArgs: ConnectionArgs) {
    return findManyCursorConnection(
      (args) =>
        this.prismaService.band.findMany({
          ...args,
          where: {
            members: { some: { id: userAuth.id } },
          },
        }),
      () =>
        this.prismaService.band.count({
          where: {
            members: { some: { id: userAuth.id } },
          },
        }),
      connectionArgs,
    );
  }

  findOne(userAuth: Profile, id: string) {
    return `This action returns a #${id} band`;
  }

  update(userAuth: Profile, id: string, updateBandDto: UpdateBandDto) {
    return `This action updates a #${id} band`;
  }

  remove(userAuth: Profile, id: string) {
    return `This action removes a #${id} band`;
  }
}
