import { ApiProperty } from '@nestjs/swagger';
import { CityResponse } from '../../city/responses/city.response';
import { ReviewExtendedResponse } from './review-extended.response';

export class ApartmentExtendedResponse {
  @ApiProperty({
    type: Number,
  })
  id: number;

  @ApiProperty({
    type: String,
  })
  title: string;

  @ApiProperty({
    type: String,
  })
  descr: string;

  @ApiProperty({
    type: String,
  })
  imgUrl: string;

  @ApiProperty({
    type: Number,
  })
  price: number;

  @ApiProperty({
    type: Number,
  })
  userId: number;

  @ApiProperty({
    type: CityResponse,
  })
  location: object;

  @ApiProperty({
    type: [ReviewExtendedResponse],
  })
  reviews: [];
}
