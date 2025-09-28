'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDiaryStore } from '@/store/diary';
import { diaryService } from '@/lib/services/diary';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Save } from 'lucide-react';
import AuthGuard from '@/components/AuthGuard';

const diarySchema = z.object({
  title: z.string().min(1, '请输入标题'),
  content: z.string().min(1, '请输入内容'),
});

type DiaryForm = z.infer<typeof diarySchema>;

export default function EditDiaryPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const params = useParams();
  const diaryId = params.id as string;
  const { updateDiary } = useDiaryStore();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<DiaryForm>({
    resolver: zodResolver(diarySchema),
  });

  useEffect(() => {
    const loadDiary = async () => {
      try {
        const diary = await diaryService.getDiary(parseInt(diaryId));
        setValue('title', diary.title);
        setValue('content', diary.content);
      } catch (error) {
        console.error('加载日记失败:', error);
        router.push('/diaries');
      }
    };

    if (diaryId) {
      loadDiary();
    }
  }, [diaryId, setValue, router]);

  const onSubmit = async (data: DiaryForm) => {
    try {
      setIsLoading(true);
      setError('');
      
      const updatedDiary = await diaryService.updateDiary(parseInt(diaryId), data);
      updateDiary(parseInt(diaryId), updatedDiary);
      
      router.push('/diaries');
    } catch (err: any) {
      setError(err.response?.data?.message || '保存失败');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
            <Button variant="outline" onClick={() => router.back()}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              返回
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">编辑日记</h1>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-8">
          <Card>
            <CardHeader>
              <CardTitle>编辑日记</CardTitle>
              <CardDescription>修改你的日记内容</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <Input
                    {...register('title')}
                    placeholder="日记标题"
                    disabled={isLoading}
                  />
                  {errors.title && (
                    <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>
                  )}
                </div>
                
                <div>
                  <Textarea
                    {...register('content')}
                    placeholder="写下你的想法..."
                    rows={15}
                    className="resize-none"
                    disabled={isLoading}
                  />
                  {errors.content && (
                    <p className="text-sm text-red-500 mt-1">{errors.content.message}</p>
                  )}
                </div>

                {error && (
                  <p className="text-sm text-red-500">{error}</p>
                )}

                <div className="flex justify-end gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                    disabled={isLoading}
                  >
                    取消
                  </Button>
                  <Button type="submit" disabled={isLoading}>
                    <Save className="w-4 h-4 mr-2" />
                    {isLoading ? '保存中...' : '保存'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </main>
      </div>
    </AuthGuard>
  );
}
