import { Injectable } from '@nestjs/common/decorators';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { PrismaService } from '../../prisma/prisma.service';
import { JwtPayload } from '../types';

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'JWT-refresh') {
  constructor(config: ConfigService, private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_REFRESH_SECRET'),
      passReqToCallback: true,
    });
  }
  async validate(req: Request, payload: JwtPayload) {
    const [refreshToken] = req.get('Authorization').split(' ').reverse();
    return { ...payload, refreshToken };
  }
}
