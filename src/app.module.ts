import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ApartmentModule } from './apartment/apartment.module';
import { OrderModule } from './order/order.module';
import { CityModule } from './city/city.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    ApartmentModule,
    OrderModule,
    CityModule,
    PrismaModule,
  ],
})
export class AppModule {}
