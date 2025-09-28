import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: '用户登录' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', description: '邮箱' },
        password: { type: 'string', description: '密码' },
      },
    },
  })
  @ApiResponse({ status: 200, description: '登录成功' })
  @ApiResponse({ status: 401, description: '邮箱或密码错误' })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  @ApiOperation({ summary: '用户注册' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', description: '邮箱' },
        password: { type: 'string', description: '密码' },
      },
    },
  })
  @ApiResponse({ status: 201, description: '注册成功' })
  @ApiResponse({ status: 400, description: '邮箱已存在' })
  async register(@Body() userData: { email: string; password: string }) {
    return this.authService.register(userData);
  }
}
