import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { PrismaService } from '../prisma/prisma.service';
import { OrderDto } from './dto';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}
  async getAll(userId: number) {
    const orders = await this.prisma.order.findMany({
      where: {
        userId,
      },
    });
    return orders;
  }
  async create(userId: number, dto: OrderDto) {
    const order = await this.prisma.order.create({
      data: {
        ...dto,
        userId,
      },
    });
    return order;
  }
  async deleteById(userId: number, orderId: number) {
    const order = await this.prisma.order.findUnique({
      where: {
        id: orderId,
      },
    });
    if (!order || order.userId !== userId)
      throw new NotFoundException('Order not found');
    await this.prisma.order.delete({
      where: {
        id: orderId,
      },
    });
    return null;
  }
}
