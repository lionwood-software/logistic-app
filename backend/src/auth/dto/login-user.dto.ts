import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({
    description: 'Username',
    example: 'NickJohnson2',
  })
  username: string;

  @ApiProperty({
    description: 'User password',
    example: 'Qwerty12345',
  })
  password: string;
}
