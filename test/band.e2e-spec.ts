import { CreateBandDto } from './../src/bands/dto/create-band.dto';
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
import { PrismaService } from '../src/prisma/prisma.service';
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

  const band: CreateBandDto = {
    name: 'band_test',
    description: 'Its a band test',
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

    const prismaService = app.get<PrismaService>(PrismaService);

    await prismaService.user.create({
      data: {
        ...user,
        password:
          '$2b$10$IaqKai/cag8GLz3RlzhfreGnZUXik1h/UDuDRfSDefFRCj9Rq0M8W', //123456
      },
    });
    await prismaService.user.create({
      data: {
        ...user2,
        password:
          '$2b$10$IaqKai/cag8GLz3RlzhfreGnZUXik1h/UDuDRfSDefFRCj9Rq0M8W', //123456
      },
    });
  });

  describe('/bands', () => {
    describe('/ (POST)', () => {
      it('should create new band with user auth in member', async () => {
        const token = await accessToken(user.username, user.password);

        return await request(app.getHttpServer())
          .post('/bands')
          .set('Accept', 'application/json')
          .auth(token, { type: 'bearer' })
          .send(band)
          .expect(HttpStatus.CREATED)
          .expect(({ body }) => {
            expect(body).toBeDefined();
            expect(body.id).toBeDefined();
            expect(body.createdAt).toBeDefined();
            expect(body.updatedAt).toBeDefined();
            expect(body.name).toEqual(band.name);
            expect(body.description).toEqual(band.description);
            expect(body.members[0].username).toEqual(user.username);
          });
      });

      it('should return 401 error for no authorize', async () => {
        return await request(app.getHttpServer())
          .post('/bands')
          .set('Accept', 'application/json')
          .send(band)
          .expect(HttpStatus.UNAUTHORIZED);
      });

      it('should return badrequest response for blank band name', async () => {
        const token = await accessToken(user.username, user.password);
        const invalidBand: CreateBandDto = {
          name: '',
          description: '',
        };

        return await request(app.getHttpServer())
          .post('/bands')
          .set('Accept', 'application/json')
          .auth(token, { type: 'bearer' })
          .send(invalidBand)
          .expect(HttpStatus.BAD_REQUEST);
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
    await prismaService.band.delete({
      where: { name: band.name },
    });

    await app.close();
  });
});
