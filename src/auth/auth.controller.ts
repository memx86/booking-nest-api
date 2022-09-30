import {
  Body,
  Controller,
  Post,
  Get,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { Public } from '../helpers/decorators';

import { AuthService } from './auth.service';
import { GetUser, GetUserId } from './decorators';
import { LoginDto, RegisterDto } from './dto';
import { RefreshGuard } from './guard/refresh.guard';

@Controller('users')
export class AuthController {
  constructor(private AuthService: AuthService) {}

  @Public()
  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.AuthService.register(dto);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.AuthService.login(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Get('current')
  current(@GetUser() user: User) {
    return user;
  }

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

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('logout')
  logout(@GetUserId() userId: number) {
    return this.AuthService.logout(userId);
  }
}
