import { ApiProperty } from '@nestjs/swagger';

export class OwnerFilteredResponse {
  @ApiProperty({
    type: String,
  })
  email: string;

  @ApiProperty({
    type: String,
  })
  name: string;

  @ApiProperty({
    type: String,
  })
  phone: string;
}
