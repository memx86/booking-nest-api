import { ApiProperty } from '@nestjs/swagger';
import { ApartmentExtendedResponse } from '../../apartment/responses';
import { OrderResponse } from './order.response';

export class OrderExtendedResponse extends OrderResponse {
  constructor() {
    super();
  }

  @ApiProperty({
    type: ApartmentExtendedResponse,
  })
  apartment: object;
}
