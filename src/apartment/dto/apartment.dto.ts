import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';

export class ApartmentDto {
  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  descr: string;

  @ApiProperty({
    type: String,
  })
  @IsUrl()
  @IsString()
  @IsNotEmpty()
  imgUrl: string;

  @ApiProperty({
    type: Number,
  })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    type: Number,
  })
  @IsNumber()
  @IsNotEmpty()
  cityId: number;
}
