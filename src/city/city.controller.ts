import { Body, Controller, Get, Post } from '@nestjs/common';
import { Public } from '../helpers/decorators';
import { CityService } from './city.service';
import { CityDto } from './dto';

@Controller('cities')
export class CityController {
  constructor(private CityService: CityService) {}

  @Public()
  @Get()
  getAll() {
    return this.CityService.getAll();
  }

  @Post()
  create(@Body() dto: CityDto) {
    return this.CityService.create(dto);
  }
}
