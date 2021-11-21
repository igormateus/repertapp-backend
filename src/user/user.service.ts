import { ConnectionArgs } from 'src/page/connection-args.dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async hashPassword(password: string) {
    const saltRounds = 12;
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
  }

  async create(createUserDto: CreateUserDto) {
    createUserDto.password = await this.hashPassword(createUserDto.password);

    return this.prisma.user.create({
      data: { ...createUserDto },
    });
  }

  findAll(connectionArgs: ConnectionArgs) {
    return findManyCursorConnection(
      (args) => this.prisma.user.findMany(args),
      () => this.prisma.user.count(),
      connectionArgs,
    );
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (!!updateUserDto.password) {
      updateUserDto.password = await this.hashPassword(updateUserDto.password);
    }
    
    return this.prisma.user.update({
      where: { id },
      data: { ...updateUserDto },
    });
  }

  remove(id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
