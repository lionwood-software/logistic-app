import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './auth.controller';
import { UserRepo } from '../db/repositories/user.repo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { RefreshToken } from './entities/refresh-token.entity';
import { JwtModule } from '@nestjs/jwt';
import { TokenService } from './services/token.service';
import { RefreshTokenRepo } from '../db/repositories/refresh-token.repo';
import { Mc } from '../users/entities/mc.entity';
import { McRepo } from '../db/repositories/mc.repo';
import { BookmarkListRepo } from '../db/repositories/bookmarkList.repo';
import { BookmarkList } from '../users/entities/bookmark-list.entity';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    TokenService,
    UserRepo,
    RefreshTokenRepo,
    McRepo,
    BookmarkListRepo,
  ],
  imports: [
    TypeOrmModule.forFeature([User, RefreshToken, Mc, BookmarkList]),
    JwtModule.register({}),
  ],
  exports: [TokenService],
})
export class AuthModule {}
