import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Diary } from './diary.entity';

@Injectable()
export class DiariesService {
  constructor(
    @InjectRepository(Diary)
    private diariesRepository: Repository<Diary>,
  ) {}

  async create(diaryData: Partial<Diary>): Promise<Diary> {
    const diary = this.diariesRepository.create(diaryData);
    return this.diariesRepository.save(diary);
  }

  async findAll(userId: number, page: number = 1, limit: number = 10): Promise<{ data: Diary[]; total: number }> {
    const [data, total] = await this.diariesRepository.findAndCount({
      where: { user_id: userId },
      order: { created_at: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });
    return { data, total };
  }

  async findOne(id: number, userId: number): Promise<Diary | null> {
    return this.diariesRepository.findOne({
      where: { id, user_id: userId },
    });
  }

  async update(id: number, userId: number, updateData: Partial<Diary>): Promise<Diary | null> {
    await this.diariesRepository.update({ id, user_id: userId }, updateData);
    return this.findOne(id, userId);
  }

  async delete(id: number, userId: number): Promise<void> {
    await this.diariesRepository.delete({ id, user_id: userId });
  }

  async search(userId: number, keyword: string, page: number = 1, limit: number = 10): Promise<{ data: Diary[]; total: number }> {
    const queryBuilder = this.diariesRepository.createQueryBuilder('diary')
      .where('diary.user_id = :userId', { userId })
      .andWhere('diary.content LIKE :keyword', { keyword: `%${keyword}%` })
      .orderBy('diary.created_at', 'DESC');

    const [data, total] = await queryBuilder
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return { data, total };
  }
}
