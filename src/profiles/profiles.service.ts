import { Page } from './../page/page.dto';
import { ConnectionArgs } from './../page/connection-args.dto';
import { profileSelect, ProfileType } from './dto/profile.dto';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';

@Injectable()
export class ProfilesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(connectionArgs: ConnectionArgs): Promise<Page<ProfileType>> {
    const usersPage = await findManyCursorConnection(
      (args) =>
        this.prisma.user.findMany({
          ...args,
          select: profileSelect,
        }),
      () => this.prisma.user.count(),
      connectionArgs,
    );

    return new Page<ProfileType>(usersPage);
  }

  async findOne(id: string): Promise<ProfileType> {
    return await this.prisma.user.findUnique({
      select: profileSelect,
      where: { id },
    });
  }
}
