import { ApiProperty } from '@nestjs/swagger';
import { OwnerFilteredResponse } from './owner-filtered.response';

export class ReviewExtendedResponse {
  @ApiProperty({
    type: Number,
  })
  id: number;

  @ApiProperty({
    type: String,
  })
  content: string;

  @ApiProperty({
    type: OwnerFilteredResponse,
  })
  owner: object;

  @ApiProperty({
    type: Number,
  })
  apartmentId: number;
}
