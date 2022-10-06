import { ApiProperty } from '@nestjs/swagger';

export class ReviewResponse {
  @ApiProperty({
    type: Number,
  })
  id: number;

  @ApiProperty({
    type: String,
  })
  content: string;

  @ApiProperty({
    type: Number,
  })
  userId: number;

  @ApiProperty({
    type: Number,
  })
  apartmentId: number;
}
