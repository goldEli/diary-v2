import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { DiariesService } from './diaries.service';
import { Diary } from './diary.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('diaries')
@Controller('diaries')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class DiariesController {
  constructor(private readonly diariesService: DiariesService) {}

  @Post()
  @ApiOperation({ summary: '创建日记' })
  @ApiResponse({ status: 201, description: '日记创建成功' })
  async create(@Body() diaryData: Partial<Diary>, @Request() req): Promise<Diary> {
    return this.diariesService.create({
      ...diaryData,
      user_id: req.user.id,
    });
  }

  @Get()
  @ApiOperation({ summary: '获取日记列表' })
  @ApiQuery({ name: 'page', required: false, description: '页码' })
  @ApiQuery({ name: 'limit', required: false, description: '每页数量' })
  @ApiResponse({ status: 200, description: '日记列表获取成功' })
  async findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
    @Request() req,
  ): Promise<{ data: Diary[]; total: number }> {
    return this.diariesService.findAll(req.user.id, +page, +limit);
  }

  @Get('search')
  @ApiOperation({ summary: '搜索日记' })
  @ApiQuery({ name: 'keyword', required: true, description: '搜索关键词' })
  @ApiQuery({ name: 'page', required: false, description: '页码' })
  @ApiQuery({ name: 'limit', required: false, description: '每页数量' })
  @ApiResponse({ status: 200, description: '搜索结果获取成功' })
  async search(
    @Query('keyword') keyword: string,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
    @Request() req,
  ): Promise<{ data: Diary[]; total: number }> {
    return this.diariesService.search(req.user.id, keyword, +page, +limit);
  }

  @Get(':id')
  @ApiOperation({ summary: '获取单篇日记' })
  @ApiResponse({ status: 200, description: '日记详情获取成功' })
  async findOne(@Param('id') id: string, @Request() req): Promise<Diary | null> {
    return this.diariesService.findOne(+id, req.user.id);
  }

  @Put(':id')
  @ApiOperation({ summary: '更新日记' })
  @ApiResponse({ status: 200, description: '日记更新成功' })
  async update(@Param('id') id: string, @Body() updateData: Partial<Diary>, @Request() req): Promise<Diary | null> {
    return this.diariesService.update(+id, req.user.id, updateData);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除日记' })
  @ApiResponse({ status: 200, description: '日记删除成功' })
  async remove(@Param('id') id: string, @Request() req): Promise<void> {
    return this.diariesService.delete(+id, req.user.id);
  }
}
