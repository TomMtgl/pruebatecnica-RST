import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    // const { authorization } = req.headers;
    // console.log('Authorization header received:', authorization);
    // if (!authorization) {
    //   throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED)
    // }
    // if (authorization !== '12345') {
    //   throw new HttpException('Forbidden', HttpStatus.FORBIDDEN)
    // }


    next();
  }
}