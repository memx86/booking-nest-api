import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Public } from '../helpers/decorators';
import { CityService } from './city.service';
import { CityDto } from './dto';
import { CityWithIdResponse } from './responses';

@ApiTags('cities')
@Controller('cities')
export class CityController {
  constructor(private CityService: CityService) {}

  @ApiOkResponse({
    description: 'Array of cities',
    type: [String],
  })
  @Public()
  @Get()
  getAll() {
    return this.CityService.getAll();
  }

  @ApiCreatedResponse({
    description: 'City added',
    type: CityWithIdResponse,
  })
  @Post()
  create(@Body() dto: CityDto) {
    return this.CityService.create(dto);
  }
}
