import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '获取用户信息' })
  @ApiResponse({ status: 200, description: '用户信息获取成功' })
  async findOne(@Param('id') id: string): Promise<User | null> {
    return this.usersService.findById(+id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '更新用户信息' })
  @ApiResponse({ status: 200, description: '用户信息更新成功' })
  async update(@Param('id') id: string, @Body() updateData: Partial<User>): Promise<User | null> {
    return this.usersService.update(+id, updateData);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '删除用户' })
  @ApiResponse({ status: 200, description: '用户删除成功' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.usersService.delete(+id);
  }
}
