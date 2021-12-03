import { authSelect } from './dto/auth.dto';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import configuration from './../config/configuration';
import { PrismaService } from './../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async hashPassword(password: string) {
    return await bcrypt.hash(password, configuration().jwt.salt);
  }

  async validateUserById(id: string) {
    return await this.prismaService.user.findUnique({
      where: { id },
      select: authSelect,
    });
  }

  async login(username: string, password: string) {
    const user = await this.prismaService.user.findUnique({
      where: { username },
      select: {
        id: true,
        password: true,
      },
    });

    if (!user)
      throw new NotFoundException(`No user found for username: ${username}`);

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) throw new UnauthorizedException('Invalid password');

    return {
      accessToken: this.jwtService.sign({ userId: user.id }),
    };
  }
}
