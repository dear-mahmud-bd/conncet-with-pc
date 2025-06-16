import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello Mahmud, This is NestJS with Prisma!';
  }
}
