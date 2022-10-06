import { ApiProperty } from '@nestjs/swagger';
import { CityResponse } from './city.response';

export class CityWithIdResponse extends CityResponse {
  constructor() {
    super();
  }

  @ApiProperty({
    type: Number,
  })
  id: number;
}
