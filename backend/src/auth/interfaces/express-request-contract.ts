import { Request } from 'express';
import { UserDto } from '../../users/dto/user/user.dto';

export interface ExpressRequestContract extends Request {
  user?: UserDto;
  fileValidationError: string;
}
