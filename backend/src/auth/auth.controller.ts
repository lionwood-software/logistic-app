import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RegisterUserDto } from './dto/register-user.dto';
import { Request, Response } from 'express';
import { UserWithTokensDto } from './dto/user-with-tokens.dto';
import { LoginUserDto } from './dto/login-user.dto';

@ApiTags('authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(201)
  @ApiOperation({ summary: 'Register user to a system' })
  @ApiBody({ type: RegisterUserDto })
  @ApiResponse({ type: UserWithTokensDto })
  @Post('registration')
  async register(
    @Body() registerUserDto: RegisterUserDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<UserWithTokensDto> {
    const userData = await this.authService.register(registerUserDto);
    response.cookie('refreshToken', userData.refreshToken, {
      maxAge: 30 * 24 * 68 * 60,
      httpOnly: true,
      // secure: true, if i will add an https
    });
    return userData;
  }

  @HttpCode(200)
  @ApiOperation({ summary: 'Login user to a system' })
  @ApiBody({ type: LoginUserDto })
  @ApiResponse({ type: UserWithTokensDto })
  @Post('login')
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<UserWithTokensDto> {
    const userData = await this.authService.login(loginUserDto);
    response.cookie('refreshToken', userData.refreshToken, {
      maxAge: 30 * 24 * 68 * 60,
      httpOnly: true,
      // secure: true, if i will add an https
    });
    return userData;
  }

  @HttpCode(202)
  @ApiOperation({ summary: 'Logout user from system' })
  @Post('logout')
  async logout(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ): Promise<any> {
    const { refreshToken } = request.cookies;
    await this.authService.logout(refreshToken);
    response.clearCookie('refreshToken');
    return 'Logout!';
  }

  @HttpCode(200)
  @ApiOperation({ summary: 'Refresh tokens (Access and Refresh)' })
  @ApiResponse({ status: 200, type: UserWithTokensDto })
  @Get('refresh')
  async refresh(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ): Promise<UserWithTokensDto> {
    const { refreshToken } = request.cookies;
    const userData = await this.authService.refresh(refreshToken);
    response.cookie('refreshToken', userData.refreshToken, {
      maxAge: 30 * 24 * 68 * 60,
      httpOnly: true,
      // secure: true, if i will add an https
    });
    return userData;
  }
}
