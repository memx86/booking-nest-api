import {
  Body,
  Controller,
  Post,
  Get,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Public } from '../helpers/decorators';

import { AuthService } from './auth.service';
import { GetUser, GetUserId } from './decorators';
import { LoginDto, RegisterDto } from './dto';
import { RefreshGuard } from './guard/refresh.guard';
import {
  TokensResponse,
  UserResponse,
  UserWithTokensResponse,
} from './responses';

@ApiTags('users')
@Controller('users')
export class AuthController {
  constructor(private AuthService: AuthService) {}

  @ApiCreatedResponse({
    description: 'Registration successfull',
    type: UserWithTokensResponse,
  })
  @Public()
  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.AuthService.register(dto);
  }

  @ApiOkResponse({
    description: 'Login successfull',
    type: UserWithTokensResponse,
  })
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.AuthService.login(dto);
  }

  @ApiOkResponse({
    description: 'Current user returned',
    type: UserResponse,
  })
  @HttpCode(HttpStatus.OK)
  @Get('current')
  current(@GetUser() user: User) {
    return user;
  }

  @ApiOkResponse({
    description: 'Refreshed successfully',
    type: TokensResponse,
  })
  @Public()
  @HttpCode(HttpStatus.OK)
  @UseGuards(RefreshGuard)
  @Get('refresh')
  refresh(
    @GetUserId() userId: number,
    @GetUser('email') email: string,
    @GetUser('refreshToken') refreshToken: string,
  ) {
    return this.AuthService.refresh({ userId, email, refreshToken });
  }

  @ApiNoContentResponse({
    description: 'Logout successfull',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('logout')
  logout(@GetUserId() userId: number) {
    return this.AuthService.logout(userId);
  }
}
