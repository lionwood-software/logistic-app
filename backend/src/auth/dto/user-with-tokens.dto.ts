import { UserJwtDto } from './user-jwt.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UserWithTokensDto {
  @ApiProperty()
  refreshToken: string;

  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  user: UserJwtDto;
}
