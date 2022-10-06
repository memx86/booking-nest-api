import { ApiProperty } from '@nestjs/swagger';
import { TokensResponse } from './tokens.response';
import { UserResponse } from './user.response';

export class UserWithTokensResponse extends TokensResponse {
  constructor() {
    super();
  }

  @ApiProperty({
    type: UserResponse,
  })
  user: object;
}
