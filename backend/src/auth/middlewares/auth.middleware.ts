import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { ExpressRequestContract } from '../interfaces/express-request-contract';
import { NextFunction, Response } from 'express';
import { TokenService } from '../services/token.service';
import { UsersService } from '../../users/services/users.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly tokenService: TokenService,
    private readonly usersService: UsersService,
  ) {}
  async use(req: ExpressRequestContract, res: Response, next: NextFunction) {
    try {
      const authorizationHeader = req.headers.authorization;
      if (!authorizationHeader) {
        req.user = null;
        next(new HttpException('No header', HttpStatus.UNAUTHORIZED));
      }
      const accessToken = authorizationHeader.split(' ')[1];
      if (!accessToken) {
        req.user = null;
        next(new HttpException('no access token', HttpStatus.UNAUTHORIZED));
      }

      const userData = await this.tokenService.validateAccessToken(accessToken);
      if (!userData) {
        next(new HttpException('Not valid', HttpStatus.UNAUTHORIZED));
      }
      req.user = await this.usersService.getById(userData.id);
      next();
    } catch (e) {
      new HttpException('Ex', HttpStatus.UNAUTHORIZED);
      next();
    }
  }
}
