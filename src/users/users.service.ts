import { Injectable } from '@nestjs/common';
import { AuthService } from './../auth/auth.service';
import { PrismaService } from './../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly authService: AuthService,
  ) {}

  // TODO: encript password
  async create(createUserDto: CreateUserDto): Promise<User> {
    createUserDto.password = await this.authService.hashPassword(
      createUserDto.password,
    );

    const user = await this.prisma.user.create({
      data: createUserDto,
    });

    return this.responseUser(user);
  }

  async loadUser(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    return this.responseUser(user);
  }

  // TODO: encript password
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    if (updateUserDto.password)
      updateUserDto.password = await this.authService.hashPassword(
        updateUserDto.password,
      );

    const user = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });

    return this.responseUser(user);
  }

  responseUser(user: User) {
    delete user.password;
    return user;
  }
}
