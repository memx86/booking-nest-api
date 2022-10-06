import { ApiProperty } from '@nestjs/swagger';

export class CityResponse {
  @ApiProperty({
    type: String,
  })
  city: string;
}
