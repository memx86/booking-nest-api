import { IsNotEmpty, IsNumber } from 'class-validator';

export class OrderDto {
  @IsNumber()
  @IsNotEmpty()
  apartmentId: number;
}
