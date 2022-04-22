import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserJwtDto } from '../dto/user-jwt.dto';
import { RefreshTokenRepo } from '../../db/repositories/refresh-token.repo';

@Injectable()
export class TokenService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private readonly tokenRepo: RefreshTokenRepo,
  ) {}
  generateTokens(payload: UserJwtDto) {
    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
      expiresIn: this.configService.get<string>('JWT_ACCESS_EXPIRATION_TIME'),
    });
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRATION_TIME'),
    });
    return {
      accessToken,
      refreshToken,
    };
  }

  async saveRefreshToken(userId, refreshToken) {
    const tokenData = await this.tokenRepo.getByOptions({
      where: { user: userId },
    });

    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return await this.tokenRepo.update({ id: tokenData.id }, tokenData);
    }
    return await this.tokenRepo.create({
      user: userId,
      refreshToken,
    });
  }

  async removeToken(refreshToken: string) {
    await this.tokenRepo.delete({ refreshToken });
  }

  async validateAccessToken(token) {
    try {
      return this.jwtService.verify(token, {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
      });
    } catch {
      return null;
    }
  }

  async validateRefreshToken(token: string) {
    try {
      return await this.jwtService.verify(token, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      });
    } catch {
      return null;
    }
  }

  async findToken(refreshToken) {
    return await this.tokenRepo.getByOptions({
      where: { refreshToken: refreshToken },
    });
  }
}
