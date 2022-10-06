import { ApiProperty } from '@nestjs/swagger';

export class ApartmentResponse {
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
    type: Number,
  })
  cityId: number;
}
