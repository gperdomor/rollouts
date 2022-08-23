import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { FastifyReply } from 'fastify';

/**
 * Custom exception filter to convert Errors from Prisma to NestJs responses
 * @see also @https://docs.nestjs.com/exception-filters
 */
@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();

    let status, error: string;

    switch (exception.code) {
      case 'P2025':
        status = HttpStatus.NOT_FOUND;
        error = 'Not Found';
        break;
      case 'P2002':
        status = HttpStatus.FORBIDDEN;
        error = 'Forbidden';
        break;
      default:
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        error = 'Internal Server Error';
    }
    BadRequestException;
    return response.status(status).send({
      statusCode: exception.code,
      message: exception.message,
      error,
    });
  }
}
