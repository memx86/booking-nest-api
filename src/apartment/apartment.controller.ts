import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Body,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GetUserId } from '../auth/decorators';
import { Public } from '../helpers/decorators';
import { ApartmentService } from './apartment.service';
import { ApartmentDto, ReviewDto } from './dto';
import {
  ApartmentResponse,
  ApartmentExtendedResponse,
  ReviewResponse,
  ApartmentWithRatingResponse,
} from './responses';

@ApiTags('apartments')
@Controller('apartments')
export class ApartmentController {
  constructor(private ApartmentService: ApartmentService) {}

  @ApiOkResponse({
    description: 'Array of apartments',
    type: [ApartmentWithRatingResponse],
  })
  @Public()
  @Get()
  getAll() {
    return this.ApartmentService.getAll();
  }

  @ApiOkResponse({
    description: 'Apartment data',
    type: ApartmentExtendedResponse,
  })
  @Public()
  @Get(':id')
  getById(@Param('id', ParseIntPipe) apartmentId: number) {
    return this.ApartmentService.getById(apartmentId);
  }

  @ApiCreatedResponse({
    description: 'Apartment added',
    type: ApartmentResponse,
  })
  @Post()
  create(@GetUserId() userId: number, @Body() dto: ApartmentDto) {
    return this.ApartmentService.create(userId, dto);
  }

  @ApiCreatedResponse({
    description: 'Review added',
    type: ReviewResponse,
  })
  @Post(':id/review')
  createReview(
    @GetUserId() userId: number,
    @Param('id', ParseIntPipe) apartmentId: number,
    @Body() dto: ReviewDto,
  ) {
    return this.ApartmentService.createReview({ userId, apartmentId, dto });
  }
}
