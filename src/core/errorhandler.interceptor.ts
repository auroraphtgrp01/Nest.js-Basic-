import { CallHandler, ExecutionContext, HttpException, Injectable, NestInterceptor } from '@nestjs/common'
import { Observable, catchError, throwError } from 'rxjs'
import { HTTP_STATUS } from '~/constant/HTTP_STATUS'

@Injectable()
export class ErrorHandlerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
    return next.handle().pipe(
      catchError((err) =>
        throwError(
          () =>
            new HttpException(
              {
                statusCode: HTTP_STATUS.BAD_REQUEST,
                message: err.message,
                data: {
                  result: err,
                  meta: {}
                }
              },
              HTTP_STATUS.BAD_REQUEST
            )
        )
      )
    )
  }
}
