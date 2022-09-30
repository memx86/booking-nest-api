import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { ApartmentModule } from './apartment/apartment.module';
import { OrderModule } from './order/order.module';
import { CityModule } from './city/city.module';
import { PrismaModule } from './prisma/prisma.module';
import { JwtGuard } from './auth/guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    ApartmentModule,
    OrderModule,
    CityModule,
    PrismaModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
  ],
})
export class AppModule {}
