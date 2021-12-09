import { PrismaService } from './../src/prisma/prisma.service';
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

  const user2: CreateUserDto = {
    username: 'test_user2',
    password: '123456',
    email: null,
    name: null,
    bio: null,
  };

  const accessToken = async (username: string, password: string) => {
    const req = await request(app.getHttpServer())
      .post('/auth/login')
      .set('Accept', 'application/json')
      .send({ username, password });

    return req.body.accessToken;
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
  });

  describe('/users', () => {
    describe('/ (POST)', () => {
      it('should register', async () => {
        return await request(app.getHttpServer())
          .post('/users')
          .set('Accept', 'application/json')
          .send(user)
          .expect(({ body }) => {
            expect(body).toBeDefined();
            expect(body.id).toBeDefined();
            expect(body.createdAt).toBeDefined();
            expect(body.updatedAt).toBeDefined();
            expect(body.username).toBeDefined();
            expect(body.password).toBeUndefined();
            expect(body.name).toBeDefined();
            expect(body.email).toBeDefined();
            expect(body.bio).toBeDefined();
          })
          .expect(HttpStatus.CREATED);
      });

      it('should reject duplicate user', async () => {
        return await request(app.getHttpServer())
          .post('/users')
          .set('Accept', 'application/json')
          .send(user)
          .expect(HttpStatus.CONFLICT);
      });
    });

    describe('/ (GET)', () => {
      it('should return user data', async () => {
        const token = await accessToken(user.username, user.password);

        return await request(app.getHttpServer())
          .get('/users')
          .set('Accept', 'application/json')
          .auth(token, { type: 'bearer' })
          .send()
          .expect(HttpStatus.OK)
          .expect(({ body }) => {
            expect(body).toBeDefined();
            expect(body.id).toBeDefined();
            expect(body.createdAt).toBeDefined();
            expect(body.updatedAt).toBeDefined();
            expect(body.username).toBeDefined();
            expect(body.password).toBeUndefined();
            expect(body.name).toBeDefined();
            expect(body.email).toBeDefined();
            expect(body.bio).toBeDefined();
          });
      });
    });

    describe('/ (PATCH)', () => {
      it('should change user data and return new user', async () => {
        const token = await accessToken(user.username, user.password);

        user.email = 'user_test@mail.com';

        return await request(app.getHttpServer())
          .patch('/users')
          .set('Accept', 'application/json')
          .auth(token, { type: 'bearer' })
          .send({ email: user.email })
          .expect(HttpStatus.OK)
          .expect(({ body }) => {
            expect(body).toBeDefined();
            expect(body.email).toEqual(user.email);
          });
      });

      it('should return error for username duplicated', async () => {
        const token = await accessToken(user.username, user.password);

        await request(app.getHttpServer())
          .post('/users')
          .set('Accept', 'application/json')
          .send(user2);

        return await request(app.getHttpServer())
          .patch('/users')
          .set('Accept', 'application/json')
          .auth(token, { type: 'bearer' })
          .send({ username: user2.username })
          .expect(HttpStatus.CONFLICT);
      });

      it('should return error for email duplicated', async () => {
        const token = await accessToken(user2.username, user2.password);

        return await request(app.getHttpServer())
          .patch('/users')
          .set('Accept', 'application/json')
          .auth(token, { type: 'bearer' })
          .send({ email: user.email })
          .expect(HttpStatus.CONFLICT);
      });
    });
  });

  afterAll(async () => {
    const prismaService = app.get<PrismaService>(PrismaService);

    await prismaService.user.delete({
      where: { username: user.username },
    });
    await prismaService.user.delete({
      where: { username: user2.username },
    });

    await app.close();
  });
});
