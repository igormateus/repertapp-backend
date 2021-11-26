import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { Injectable } from '@nestjs/common';
import { ConnectionArgs } from './../page/connection-args.dto';
import { PrismaService } from './../prisma/prisma.service';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: string) {
    return await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        name: true,
        bio: true,
        imageUrl: true,
      },
    });
  }

  async findAll(connectionArgs: ConnectionArgs) {
    return await findManyCursorConnection(
      (args) =>
        this.prisma.user.findMany({
          ...args,
          select: {
            id: true,
            username: true,
            name: true,
            bio: true,
            imageUrl: true,
          },
        }),
      () => this.prisma.user.count(),
      connectionArgs,
    );
  }
}
