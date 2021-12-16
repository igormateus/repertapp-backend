import { Page } from './../page/page.dto';
import { ConnectionArgs } from './../page/connection-args.dto';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import {
  Band,
  bandSelect,
  bandSummarySelect,
  BandSummaryType,
  BandType,
} from './entities/band.entity';
import { PrismaService } from './../prisma/prisma.service';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBandDto } from './dto/create-band.dto';
import { UpdateBandDto } from './dto/update-band.dto';

@Injectable()
export class BandsService {
  constructor(private readonly prismaService: PrismaService) {}

  hasMember(band: Band, userId: string): boolean {
    return !!band.members.filter((user) => user.id === userId).length;
  }

  async create(creatorId: string, createBandDto: CreateBandDto): Promise<Band> {
    return await this.prismaService.band.create({
      data: {
        ...createBandDto,
        members: {
          connect: { id: creatorId },
        },
      },
      select: { ...bandSelect },
    });
  }

  async findAll(
    userId: string,
    connectionArgs: ConnectionArgs,
  ): Promise<Page<BandSummaryType>> {
    const where = {
      members: {
        some: { id: userId },
      },
    };

    const bandsPage = await findManyCursorConnection(
      (args) =>
        this.prismaService.band.findMany({
          ...args,
          where,
          select: bandSummarySelect,
        }),
      () => this.prismaService.band.count({ where }),
      connectionArgs,
    );

    return new Page<BandSummaryType>(bandsPage);
  }

  async findOne(userId: string, bandId: string): Promise<BandType> {
    const band = await this.prismaService.band.findUnique({
      where: { id: bandId },
      select: { ...bandSelect },
    });

    if (!band)
      throw new NotFoundException(`No band found with id: '${bandId}'`);

    if (!this.hasMember(band, userId))
      throw new ForbiddenException(
        `Unauthorized user to access band with id: '${bandId}'`,
      );

    return band;
  }

  async update(
    userId: string,
    bandId: string,
    updateBandDto: UpdateBandDto,
  ): Promise<Band> {
    await this.findOne(userId, bandId);

    return await this.prismaService.band.update({
      where: { id: bandId },
      data: updateBandDto,
      select: { ...bandSelect },
    });
  }

  async delete(userAuthId: string, bandId: string): Promise<void> {
    const band = await this.findOne(userAuthId, bandId);

    if (band.members.length > 1)
      throw new BadRequestException(
        `Band ${band.name} must have only one user to be deleted`,
      );

    await this.prismaService.band.delete({
      where: { id: bandId },
    });
  }

  async addMember(
    userAuthId: string,
    bandId: string,
    memberId: string,
  ): Promise<Band> {
    const band = await this.findOne(userAuthId, bandId);

    if (userAuthId === memberId || this.hasMember(band, memberId))
      throw new BadRequestException(
        `Band ${band.name} has member with User Id ${memberId}`,
      );

    return await this.prismaService.band.update({
      where: { id: bandId },
      data: {
        members: { connect: { id: memberId } },
      },
      select: { ...bandSelect },
    });
  }

  async removeMember(
    userAuthId: string,
    bandId: string,
    memberId: string,
  ): Promise<Band> {
    const band = await this.findOne(userAuthId, bandId);

    if (band.members.length === 1)
      throw new BadRequestException(
        `You cannot remove the last user from band '${band.name}'`,
      );

    if (!this.hasMember(band, memberId))
      throw new BadRequestException(
        `Band ${band.name} hasn't member with User Id ${memberId}`,
      );

    const where = { id: bandId };
    const select = { ...bandSelect };

    return this.prismaService.band.update({
      where,
      select,
      data: {
        members: {
          disconnect: { id: memberId },
        },
      },
    });
  }
}
