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
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBandDto } from './dto/create-band.dto';
import { UpdateBandDto } from './dto/update-band.dto';

@Injectable()
export class BandsService {
  constructor(private readonly prismaService: PrismaService) {}

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

    const hasMember = band.members.filter((user) => user.id === userId).length;

    if (!hasMember)
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
}
