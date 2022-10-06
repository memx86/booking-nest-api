import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Body,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
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

  @ApiNotFoundResponse({
    description: 'Apartment not found',
  })
  @ApiOkResponse({
    description: 'Apartment data',
    type: ApartmentExtendedResponse,
  })
  @Public()
  @Get(':id')
  getById(@Param('id', ParseIntPipe) apartmentId: number) {
    return this.ApartmentService.getById(apartmentId);
  }

  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @ApiBadRequestResponse({
    description: 'Bad request',
  })
  @ApiCreatedResponse({
    description: 'Apartment added',
    type: ApartmentResponse,
  })
  @ApiBearerAuth()
  @Post()
  create(@GetUserId() userId: number, @Body() dto: ApartmentDto) {
    return this.ApartmentService.create(userId, dto);
  }

  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @ApiBadRequestResponse({
    description: 'Bad request',
  })
  @ApiCreatedResponse({
    description: 'Review added',
    type: ReviewResponse,
  })
  @ApiBearerAuth()
  @Post(':id/review')
  createReview(
    @GetUserId() userId: number,
    @Param('id', ParseIntPipe) apartmentId: number,
    @Body() dto: ReviewDto,
  ) {
    return this.ApartmentService.createReview({ userId, apartmentId, dto });
  }
}
