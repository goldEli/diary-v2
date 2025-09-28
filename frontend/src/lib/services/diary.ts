import { api } from '@/lib/api';
import { Diary, DiaryListResponse } from '@/types';

export const diaryService = {
  async getDiaries(page: number = 1, limit: number = 10): Promise<DiaryListResponse> {
    const response = await api.get(`/diaries?page=${page}&limit=${limit}`);
    return response.data;
  },

  async getDiary(id: number): Promise<Diary> {
    const response = await api.get(`/diaries/${id}`);
    return response.data;
  },

  async createDiary(diary: Partial<Diary>): Promise<Diary> {
    const response = await api.post('/diaries', diary);
    return response.data;
  },

  async updateDiary(id: number, diary: Partial<Diary>): Promise<Diary> {
    const response = await api.put(`/diaries/${id}`, diary);
    return response.data;
  },

  async deleteDiary(id: number): Promise<void> {
    await api.delete(`/diaries/${id}`);
  },

  async searchDiaries(keyword: string, page: number = 1, limit: number = 10): Promise<DiaryListResponse> {
    const response = await api.get(`/diaries/search?keyword=${keyword}&page=${page}&limit=${limit}`);
    return response.data;
  },
};
