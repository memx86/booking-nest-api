import { Injectable } from '@nestjs/common';
import {
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common/exceptions';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt/dist';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import * as argon from 'argon2';

import { RegisterDto, LoginDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async register(dto: RegisterDto) {
    const password = await argon.hash(dto.password);
    try {
      const user = await this.prisma.user.create({
        data: {
          ...dto,
          password,
        },
      });
      delete user.password;

      const token = await this.signToken(user.id, user.email);
      return { user, token };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('Credentials taken');
        }
      }
      throw error;
    }
  }
  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user) throw new NotFoundException('User not found');

    const isPasswordMatch = await argon.verify(user.password, dto.password);
    if (!isPasswordMatch)
      throw new UnauthorizedException("Email and password don't match");

    delete user.password;
    const token = await this.signToken(user.id, user.email);
    return { user, token };
  }

  async signToken(userId: number, email: string) {
    const payload = {
      sub: userId,
      email,
    };
    const secret = this.config.get('JWT_SECRET');
    const token = await this.jwt.signAsync(payload, {
      secret,
      expiresIn: '15m',
    });
    return token;
  }
}
