import { ApiProperty } from '@nestjs/swagger';

export class UserJwtDto {
  @ApiProperty()
  id: number;

  constructor(model) {
    this.id = model.id;
  }
}
