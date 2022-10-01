import { Module } from '@nestjs/common';
import { ApartmentService } from './apartment.service';
import { ApartmentController } from './apartment.controller';

@Module({
  providers: [ApartmentService],
  controllers: [ApartmentController]
})
export class ApartmentModule {}
