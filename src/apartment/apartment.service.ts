import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ApartmentDto, ReviewDto } from './dto';

@Injectable()
export class ApartmentService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    const apartments = await this.prisma.apartment.findMany({
      include: {
        reviews: true,
        location: {
          select: {
            city: true,
          },
        },
      },
    });
    const preparedApartments = apartments.map((apartment) => {
      const rating = this.calculateRating(apartment.reviews);
      const { reviews, ...filteredApartment } = apartment;
      return { ...filteredApartment, rating };
    });
    return preparedApartments;
  }

  async getById(apartmentId: number) {
    const apartment = await this.prisma.apartment.findUnique({
      where: {
        id: apartmentId,
      },
      include: {
        reviews: {
          include: {
            owner: {
              select: {
                name: true,
                email: true,
                phone: true,
              },
            },
          },
        },
        location: {
          select: {
            city: true,
          },
        },
      },
    });

    if (!apartment) throw new NotFoundException('Apartment not found');
    const rating = this.calculateRating(apartment.reviews);

    return { ...apartment, rating };
  }

  async create(userId: number, dto: ApartmentDto) {
    const apartment = await this.prisma.apartment.create({
      data: {
        ...dto,
        userId,
      },
    });
    return apartment;
  }

  async createReview(params: {
    userId: number;
    apartmentId: number;
    dto: ReviewDto;
  }) {
    const { userId, apartmentId, dto } = params;
    const review = await this.prisma.review.create({
      data: {
        ...dto,
        userId,
        apartmentId,
      },
    });
    return review;
  }

  calculateRating(reviews: ReviewDto[]) {
    if (!reviews.length) return 0;

    return (
      reviews.reduce((acc, review) => (acc += review.rating), 0) /
      reviews.length
    );
  }
}
