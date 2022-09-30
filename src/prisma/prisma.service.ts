import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(config: ConfigService) {
    super({
      datasources: {
        db: {
          url: config.get('DATABASE_URL'),
        },
      },
    });
  }
  clearDb() {
    return Promise.allSettled([
      this.user.deleteMany(),
      this.apartment.deleteMany(),
      this.order.deleteMany(),
      this.city.deleteMany(),
    ]);
  }
}
