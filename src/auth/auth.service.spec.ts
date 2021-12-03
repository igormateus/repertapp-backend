import { JwtService } from '@nestjs/jwt';
import { prismaServiceMock } from './../util/test/prisma-service-mock';
import { PrismaService } from './../prisma/prisma.service';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { ExecutionContext } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: PrismaService,
          useValue: prismaServiceMock,
        },
        {
          provide: JwtService,
          useValue: {
            canActivate: (context: ExecutionContext) => {
              const req = context.switchToHttp().getRequest();
              req.user = {
                id: 'asdfjkl;asdfjkl;',
                createdAt: Date.now(),
                updatedAt: Date.now(),
                username: 'user_test',
                password: '123456',
                email: null,
                name: null,
                bio: null,
                imageUrl: null,
              };
            },
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('hashPassword', () => {
    it('should hash a password', async () => {
      const pass = '123456';
      const hashPass = await authService.hashPassword(pass);

      const compare = await bcrypt.compare(pass, hashPass);

      expect(compare).toBeDefined();
      expect(compare).toBe(true);
    });
  });
});
