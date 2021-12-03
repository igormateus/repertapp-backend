import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from './../auth/auth.service';
import { PrismaService } from './../prisma/prisma.service';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, PrismaService, AuthService],
    })
      // .overrideProvider(PrismaService)
      // .useValue(prismaServiceMock)
      // .overrideProvider(AuthService)
      // .useValue(authServiceMock)
      .compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('CreateUser', () => {
    it('should get data from new user', () => {
      const sut = new CreateUserDto();

      expect(sut).toHaveProperty('username');
      expect(sut).toHaveProperty('password');
      expect(sut).toHaveProperty('name');
      expect(sut).toHaveProperty('email');
      expect(sut).toHaveProperty('bio');
    });
  });
});
