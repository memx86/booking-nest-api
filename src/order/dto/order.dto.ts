import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class OrderDto {
  @ApiProperty({
    type: Number,
  })
  @IsNumber()
  @IsNotEmpty()
  apartmentId: number;
}
