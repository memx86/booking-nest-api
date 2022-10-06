import { ApiProperty } from '@nestjs/swagger';

export class TokensResponse {
  @ApiProperty({
    type: String,
  })
  token: string;

  @ApiProperty({
    type: String,
  })
  refreshToken: string;
}
