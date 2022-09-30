import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import * as argon from 'argon2';

import { AppModule } from './../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';

describe('AppController e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();
    prisma = app.get(PrismaService);
    await prisma.clearDb();
  });

  afterAll(() => {
    app.close();
  });

  describe('Login route e2e', () => {
    beforeEach(async () => {
      await prisma.clearDb();
    });

    it('status 200, token and user object with name and email', async () => {
      const newUser = {
        email: 'test@mail.com',
        password: '123456',
      };
      const password = await argon.hash(newUser.password);
      const newUserCreate = {
        ...newUser,
        name: 'test',
        password,
      };

      const { id } = await prisma.user.create({
        data: newUserCreate,
      });

      const response = await request(app.getHttpServer())
        .post('/users/login')
        .send(newUser);
      const { body } = response;
      const { name, email } = await prisma.user.findUnique({
        where: {
          id,
        },
      });

      expect(response.statusCode).toBe(200);
      expect(body.token).toBeDefined();
      expect(body.user).toBeDefined();
      expect(body.user).toEqual(
        expect.objectContaining({
          name,
          email,
        }),
      );
    });

    it('empty user, status 400, 4 messages', async () => {
      const newUser = {};

      const response = await request(app.getHttpServer())
        .post('/users/login')
        .send(newUser);
      const { body } = response;

      expect(response.statusCode).toBe(400);
      expect(body.message).toStrictEqual([
        'email should not be empty',
        'email must be an email',
        'password should not be empty',
        'password must be a string',
      ]);
    });

    it('no password, status 400, 2 messages', async () => {
      const newUser = {
        email: 'test@mail.com',
      };

      const response = await request(app.getHttpServer())
        .post('/users/login')
        .send(newUser);
      const { body } = response;

      expect(response.statusCode).toBe(400);
      expect(body.message).toStrictEqual([
        'password should not be empty',
        'password must be a string',
      ]);
    });

    it('no email, status 400, 2 messages', async () => {
      const newUser = {
        password: '123456',
      };

      const response = await request(app.getHttpServer())
        .post('/users/login')
        .send(newUser);
      const { body } = response;

      expect(response.statusCode).toBe(400);
      expect(body.message).toStrictEqual([
        'email should not be empty',
        'email must be an email',
      ]);
    });

    it('wrong email 123 , status 400, email must be an email', async () => {
      const newUser = {
        email: 123,
        password: '123456',
      };

      const response = await request(app.getHttpServer())
        .post('/users/login')
        .send(newUser);
      const { body } = response;

      expect(response.statusCode).toBe(400);
      expect(body.message).toStrictEqual(['email must be an email']);
    });

    it('wrong email false , status 400, email must be an email', async () => {
      const newUser = {
        email: false,
        password: '123456',
      };

      const response = await request(app.getHttpServer())
        .post('/users/login')
        .send(newUser);
      const { body } = response;

      expect(response.statusCode).toBe(400);
      expect(body.message).toStrictEqual(['email must be an email']);
    });

    it('wrong email {} , status 400, email must be an email', async () => {
      const newUser = {
        email: {},
        password: '123456',
      };

      const response = await request(app.getHttpServer())
        .post('/users/login')
        .send(newUser);
      const { body } = response;

      expect(response.statusCode).toBe(400);
      expect(body.message).toStrictEqual(['email must be an email']);
    });

    it('wrong email [] , status 400, email must be an email', async () => {
      const newUser = {
        email: [],
        password: '123456',
      };

      const response = await request(app.getHttpServer())
        .post('/users/login')
        .send(newUser);
      const { body } = response;

      expect(response.statusCode).toBe(400);
      expect(body.message).toStrictEqual(['email must be an email']);
    });

    it('wrong email 123@123. , status 400, email must be an email', async () => {
      const newUser = {
        email: '123@123.',
        password: '123456',
      };

      const response = await request(app.getHttpServer())
        .post('/users/login')
        .send(newUser);
      const { body } = response;

      expect(response.statusCode).toBe(400);
      expect(body.message).toStrictEqual(['email must be an email']);
    });

    it('wrong password 123456 , status 400, password must be a string', async () => {
      const newUser = {
        email: 'test@mail.com',
        password: 123456,
      };

      const response = await request(app.getHttpServer())
        .post('/users/login')
        .send(newUser);
      const { body } = response;

      expect(response.statusCode).toBe(400);
      expect(body.message).toStrictEqual(['password must be a string']);
    });

    it('wrong password false , status 400, password must be a string', async () => {
      const newUser = {
        email: 'test@mail.com',
        password: false,
      };

      const response = await request(app.getHttpServer())
        .post('/users/login')
        .send(newUser);
      const { body } = response;

      expect(response.statusCode).toBe(400);
      expect(body.message).toStrictEqual(['password must be a string']);
    });

    it('wrong password {} , status 400, password must be a string', async () => {
      const newUser = {
        email: 'test@mail.com',
        password: {},
      };

      const response = await request(app.getHttpServer())
        .post('/users/login')
        .send(newUser);
      const { body } = response;

      expect(response.statusCode).toBe(400);
      expect(body.message).toStrictEqual(['password must be a string']);
    });

    it('wrong password [] , status 400, password must be a string', async () => {
      const newUser = {
        email: 'test@mail.com',
        password: [],
      };

      const response = await request(app.getHttpServer())
        .post('/users/login')
        .send(newUser);
      const { body } = response;

      expect(response.statusCode).toBe(400);
      expect(body.message).toStrictEqual(['password must be a string']);
    });

    it('no such email in base, status 401, Email or password is wrong', async () => {
      const newUser = {
        email: 'test@mail.com',
        password: '123456',
      };

      const response = await request(app.getHttpServer())
        .post('/users/login')
        .send(newUser);
      const { body } = response;

      expect(response.statusCode).toBe(401);
      expect(body.message).toStrictEqual('Email or password is wrong');
    });

    it('wrong password, status 401, Email or password is wrong', async () => {
      const newUser = {
        name: 'test',
        email: 'test@mail.com',
        password: '123456',
      };
      const password = await argon.hash(newUser.password);
      await prisma.user.create({
        data: { ...newUser, password },
      });

      const wrongUser = {
        ...newUser,
        password: '1234567',
      };
      const response = await request(app.getHttpServer())
        .post('/users/login')
        .send(wrongUser);
      const { body } = response;

      expect(response.statusCode).toBe(401);
      expect(body.message).toBe('Email or password is wrong');
    });
  });
});
