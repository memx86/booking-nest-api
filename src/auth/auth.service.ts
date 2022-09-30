import { Injectable } from '@nestjs/common';
import {
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common/exceptions';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt/dist';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import * as argon from 'argon2';

import { RegisterDto, LoginDto } from './dto';
import { userResExclude } from './helpers/userResExclude';
import { PrismaService } from '../prisma/prisma.service';
import excludeFields from '../helpers/excludeFields';
import { RefreshPayload } from './types';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async register(dto: RegisterDto) {
    try {
      const password = await argon.hash(dto.password);

      const user = await this.prisma.user.create({
        data: {
          ...dto,
          password,
        },
      });

      const { token, refreshToken, refreshTokenHashed } = await this.getTokens(
        user.id,
        user.email,
      );

      await this.prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          refreshToken: refreshTokenHashed,
        },
      });

      const filteredUser = excludeFields(user, userResExclude);

      return { user: filteredUser, token, refreshToken };
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
    if (!user) throw new UnauthorizedException('Email or password is wrong');

    const isPasswordMatch = await argon.verify(user.password, dto.password);
    if (!isPasswordMatch)
      throw new UnauthorizedException('Email or password is wrong');

    const { token, refreshToken, refreshTokenHashed } = await this.getTokens(
      user.id,
      user.email,
    );
    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        refreshToken: refreshTokenHashed,
      },
    });

    const filteredUser = excludeFields(user, userResExclude);
    return { user: filteredUser, token, refreshToken };
  }

  async refresh(params: RefreshPayload) {
    const { userId, email, refreshToken } = params;
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) throw new UnauthorizedException('Invalid token');
    if (!user.refreshToken) throw new UnauthorizedException('User logged out');

    const isTokenMatch = await argon.verify(user.refreshToken, refreshToken);
    if (!isTokenMatch) throw new UnauthorizedException('Invalid token');

    const tokens = await this.getTokens(userId, email);
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        refreshToken: tokens.refreshTokenHashed,
      },
    });
    return { token: tokens.token, refreshToken: tokens.refreshToken };
  }

  async logout(userId: number) {
    await this.prisma.user.updateMany({
      where: {
        id: userId,
        refreshToken: {
          not: null,
        },
      },
      data: {
        refreshToken: null,
      },
    });
    return null;
  }

  async getTokens(userId: number, email: string) {
    const payload = {
      sub: userId,
      email,
    };

    const secret = this.config.get('JWT_SECRET');
    const token = await this.jwt.signAsync(payload, {
      secret,
      expiresIn: '15m',
    });

    const refreshSecret = this.config.get('JWT_REFRESH_SECRET');
    const refreshToken = await this.jwt.signAsync(payload, {
      secret: refreshSecret,
      expiresIn: '7d',
    });

    const refreshTokenHashed = await argon.hash(refreshToken);
    return { token, refreshToken, refreshTokenHashed };
  }
}
