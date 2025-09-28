import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && await this.usersService.validatePassword(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
      },
    };
  }

  async register(userData: { email: string; password: string }) {
    // 检查邮箱是否已存在
    const existingEmail = await this.usersService.findByEmail(userData.email);
    if (existingEmail) {
      throw new UnauthorizedException('邮箱已存在');
    }

    const user = await this.usersService.create(userData);
    const { password, ...result } = user;
    return result;
  }
}
