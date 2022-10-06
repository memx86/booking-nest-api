import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CityDto {
  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  city: string;
}
