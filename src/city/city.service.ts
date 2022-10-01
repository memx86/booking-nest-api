import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CityDto } from './dto';

@Injectable()
export class CityService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    const cities = await this.prisma.city.findMany();
    const preparedCities = cities.map((city) => city.city);
    return preparedCities;
  }

  async create(dto: CityDto) {
    const city = await this.prisma.city.create({
      data: dto,
    });
    return city;
  }
}
