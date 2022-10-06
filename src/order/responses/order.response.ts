import { ApiProperty } from '@nestjs/swagger';

export class OrderResponse {
  @ApiProperty({
    type: Number,
  })
  id: number;

  @ApiProperty({
    type: Number,
  })
  userId: number;

  @ApiProperty({
    type: Number,
  })
  apartmentId: number;

  @ApiProperty({
    type: String,
  })
  date: string;
}
