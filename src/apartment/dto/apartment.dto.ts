import { IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';

export class ApartmentDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  descr: string;

  @IsUrl()
  @IsString()
  @IsNotEmpty()
  imgUrl: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  cityId: number;
}
