import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { ExpressRequestContract } from '../interfaces/express-request-contract';
import { NextFunction, Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiTokenMiddleware implements NestMiddleware {
  constructor(private readonly configService: ConfigService) {}
  async use(req: ExpressRequestContract, res: Response, next: NextFunction) {
    try {
      const authorizationHeader = req.headers['secret-key'];
      if (!authorizationHeader) {
        next(new HttpException('No header', HttpStatus.UNAUTHORIZED));
      }
      const apiKey = this.configService.get<string>('API_KEY');
      if (authorizationHeader !== apiKey) {
        next(new HttpException('Invalid token', HttpStatus.UNAUTHORIZED));
      }
      next();
    } catch (e) {
      new HttpException('Unknown exception', HttpStatus.INTERNAL_SERVER_ERROR);
      next();
    }
  }
}
