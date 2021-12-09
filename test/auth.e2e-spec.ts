import { PrismaService } from '../src/prisma/prisma.service';
import {
  ClassSerializerInterceptor,
  HttpStatus,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { HttpAdapterHost, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import configuration from '../src/config/configuration';
import { PrismaClientExceptionFilter } from '../src/filters/prisma-client-exception.filter';
import { CreateUserDto } from '../src/users/dto/create-user.dto';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  const user: CreateUserDto = {
    username: 'test_user',
    password: '123456',
    email: null,
    name: null,
    bio: null,
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        transform: true, // automatically transform payloads
        transformOptions: {
          enableImplicitConversion: true, // transform based on TS type
        },
      }),
    );

    app.useGlobalInterceptors(
      new ClassSerializerInterceptor(app.get(Reflector)),
    );

    const { httpAdapter } = app.get(HttpAdapterHost);
    app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

    const config = new DocumentBuilder()
      .setTitle(configuration().app.name)
      .setDescription(configuration().app.description)
      .setVersion(configuration().app.version)
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.init();

    await await request(app.getHttpServer())
      .post('/users')
      .set('Accept', 'application/json')
      .send(user);
  });

  describe('/auth', () => {
    describe('/login (POST)', () => {
      it('should validate user', async () => {
        return await request(app.getHttpServer())
          .post('/auth/login')
          .set('Accept', 'application/json')
          .send({ username: user.username, password: user.password })
          .expect(HttpStatus.CREATED)
          .expect(({ body }) => {
            expect(body.accessToken).toBeDefined();
          });
      });

      it('should return error for invalid user', async () => {
        return await request(app.getHttpServer())
          .post('/auth/login')
          .set('Accept', 'application/json')
          .send({ username: user.username, password: 'errorpass' })
          .expect(HttpStatus.UNAUTHORIZED);
      });
    });
  });

  afterAll(async () => {
    const prismaService = app.get<PrismaService>(PrismaService);

    await prismaService.user.delete({
      where: { username: user.username },
    });

    await app.close();
  });
});
