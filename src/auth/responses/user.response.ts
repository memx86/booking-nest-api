import { ApiProperty } from '@nestjs/swagger';

export class UserResponse {
  @ApiProperty({
    type: Number,
  })
  id: number;

  @ApiProperty({
    type: String,
  })
  name: string;

  @ApiProperty({
    type: String,
  })
  email: string;
}
