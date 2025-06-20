// src/prisma-client-exception.filter.ts

import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)  // 1
export class PrismaClientExceptionFilter extends BaseExceptionFilter { // 2
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    console.error(exception.message);  // 3
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const message = exception.message.replace(/\n/g, '');

    switch (exception.code) {
      case 'P2002': {
        const status = HttpStatus.CONFLICT;
        response.status(status).json({
          statusCode: status,
          message: message,
        });
        break;
      }
      // case 'P2025': {  // Handle record not found (missing record)
      //   const status = HttpStatus.NOT_FOUND;
      //   response.status(status).json({
      //     statusCode: status,
      //     message: 'Record not found',
      //   });
      //   break;
      // }
      default:
        // default 500 error code
        console.log('------------------------------>',exception.code);
        super.catch(exception, host);
        break;
    }
  }
}
