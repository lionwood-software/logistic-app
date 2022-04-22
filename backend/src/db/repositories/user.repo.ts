import { BaseRepoAbstract } from './base/base.repo.abstract';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../users/entities/user.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { nameof } from 'ts-simple-nameof';

@Injectable()
export class UserRepo extends BaseRepoAbstract<User> {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {
    super(userRepo, nameof(User));
  }
}
