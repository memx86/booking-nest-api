import { ApiProperty } from '@nestjs/swagger';
import { ApartmentExtendedResponse } from './apartment-extended.response';

export class ApartmentWithRatingResponse extends ApartmentExtendedResponse {
  constructor() {
    super();
  }
  @ApiProperty({
    type: Number,
  })
  rating: number;
}
