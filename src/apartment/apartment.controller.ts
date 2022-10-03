import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Body,
} from '@nestjs/common';
import { GetUserId } from '../auth/decorators';
import { Public } from '../helpers/decorators';
import { ApartmentService } from './apartment.service';
import { ApartmentDto, ReviewDto } from './dto';

@Controller('apartments')
export class ApartmentController {
  constructor(private ApartmentService: ApartmentService) {}

  @Public()
  @Get()
  getAll() {
    return this.ApartmentService.getAll();
  }

  @Public()
  @Get(':id')
  getById(@Param('id', ParseIntPipe) apartmentId: number) {
    return this.ApartmentService.getById(apartmentId);
  }

  @Post()
  create(@GetUserId() userId: number, @Body() dto: ApartmentDto) {
    return this.ApartmentService.create(userId, dto);
  }

  @Post(':id/review')
  createReview(
    @GetUserId() userId: number,
    @Param('id', ParseIntPipe) apartmentId: number,
    @Body() dto: ReviewDto,
  ) {
    return this.ApartmentService.createReview({ userId, apartmentId, dto });
  }
}
