import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from './../auth/auth.service';
import { PrismaService } from './../prisma/prisma.service';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { validate, validateOrReject } from 'class-validator';

describe('UsersService', () => {
  let service: UsersService;

  const mockPrismaService = {
    post: {
      create: jest
        .fn()
        .mockResolvedValue(async (createUserDto: CreateUserDto) => {
          const user = new User();
          user.username = createUserDto.username;
          user.password = createUserDto.password;
          user.createdAt = new Date();
          user.updatedAt = new Date();
          user.id = 'id_test';
          return await user;
        }),
      findMany: jest.fn().mockResolvedValue([]),
      findUnique: jest.fn().mockResolvedValue({}),
      update: jest.fn().mockResolvedValue({}),
      delete: jest.fn().mockResolvedValue({}),
    },
  };

  const mockAuthService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, PrismaService, AuthService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockPrismaService)
      .overrideProvider(AuthService)
      .useValue(mockAuthService)
      .compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should valid user with username and password', () => {
      const username = 'username_test';
      const password = '';

      const createUser = new CreateUserDto();
      createUser.username = username;
      createUser.password = password;

      const sut = validateOrReject(createUser);

      expect(sut).resolves.toBeNull();
    });
  });
});
