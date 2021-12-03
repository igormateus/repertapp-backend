import { PrismaClient } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    // pass PrismaClientOptions e.g. logginglevels or error formatting
    super();
  }
}
