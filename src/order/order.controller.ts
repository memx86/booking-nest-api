import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  ParseIntPipe,
  Body,
  HttpCode,
} from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { GetUserId } from '../auth/decorators';
import { OrderDto } from './dto';
import { OrderService } from './order.service';

@Controller('orders')
export class OrderController {
  constructor(private OrderService: OrderService) {}
  @Get()
  getAll(@GetUserId() userId: number) {
    return this.OrderService.getAll(userId);
  }

  @Post()
  create(@GetUserId() userId: number, @Body() dto: OrderDto) {
    return this.OrderService.create(userId, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteById(
    @GetUserId() userId: number,
    @Param('id', ParseIntPipe) orderId: number,
  ) {
    return this.OrderService.deleteById(userId, orderId);
  }
}
