import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiariesService } from './diaries.service';
import { DiariesController } from './diaries.controller';
import { Diary } from './diary.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Diary])],
  controllers: [DiariesController],
  providers: [DiariesService],
  exports: [DiariesService],
})
export class DiariesModule {}
