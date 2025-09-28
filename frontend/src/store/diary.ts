import { create } from 'zustand';
import { Diary } from '@/types';

interface DiaryState {
  diaries: Diary[];
  currentDiary: Diary | null;
  loading: boolean;
  setDiaries: (diaries: Diary[]) => void;
  setCurrentDiary: (diary: Diary | null) => void;
  addDiary: (diary: Diary) => void;
  updateDiary: (id: number, diary: Partial<Diary>) => void;
  deleteDiary: (id: number) => void;
  setLoading: (loading: boolean) => void;
}

export const useDiaryStore = create<DiaryState>((set) => ({
  diaries: [],
  currentDiary: null,
  loading: false,
  setDiaries: (diaries) => set({ diaries }),
  setCurrentDiary: (diary) => set({ currentDiary: diary }),
  addDiary: (diary) => set((state) => ({ diaries: [diary, ...state.diaries] })),
  updateDiary: (id, updatedDiary) =>
    set((state) => ({
      diaries: state.diaries.map((diary) =>
        diary.id === id ? { ...diary, ...updatedDiary } : diary
      ),
    })),
  deleteDiary: (id) =>
    set((state) => ({
      diaries: state.diaries.filter((diary) => diary.id !== id),
    })),
  setLoading: (loading) => set({ loading }),
}));
