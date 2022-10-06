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
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { GetUserId } from '../auth/decorators';
import { OrderDto } from './dto';
import { OrderService } from './order.service';
import { OrderExtendedResponse, OrderResponse } from './responses';

@ApiUnauthorizedResponse({
  description: 'Unauthorized',
})
@ApiBearerAuth()
@ApiTags('orders')
@Controller('orders')
export class OrderController {
  constructor(private OrderService: OrderService) {}

  @ApiOkResponse({
    description: "Array of user's oredrs",
    type: [OrderExtendedResponse],
  })
  @Get()
  getAll(@GetUserId() userId: number) {
    return this.OrderService.getAll(userId);
  }

  @ApiBadRequestResponse({
    description: 'Bad request',
  })
  @ApiCreatedResponse({
    description: 'Order added',
    type: OrderResponse,
  })
  @Post()
  create(@GetUserId() userId: number, @Body() dto: OrderDto) {
    return this.OrderService.create(userId, dto);
  }

  @ApiNotFoundResponse({
    description: 'Not found',
  })
  @ApiNoContentResponse({
    description: 'Order deleted',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteById(
    @GetUserId() userId: number,
    @Param('id', ParseIntPipe) orderId: number,
  ) {
    return this.OrderService.deleteById(userId, orderId);
  }
}
