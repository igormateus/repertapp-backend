import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    switch (exception.code) {
      case 'P2002': // https://www.prisma.io/docs/reference/api-reference/error-reference#prisma-client-query-engine
        const statusCode = HttpStatus.CONFLICT;
        const message = exception.message.replace(/\n/g, '');
        response.status(statusCode).json({
          statusCode,
          message,
        });
        break;
      default:
        //default 500 error code
        super.catch(exception, host);
        break;
    }
  }
}
