'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDiaryStore } from '@/store/diary';
import { diaryService } from '@/lib/services/diary';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Save } from 'lucide-react';
import { Input } from '@/components/ui/input';

const diarySchema = z.object({
  content: z.string().min(1, '请输入内容'),
  created_at: z.string().min(1, '请选择日期'),
});

type DiaryForm = z.infer<typeof diarySchema>;

export default function NewDiaryPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { addDiary } = useDiaryStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DiaryForm>({
    resolver: zodResolver(diarySchema),
  });

  const formatDate = (str: string) => {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    return `${str} ${hours}:${minutes}:${seconds}`;
  };

  const onSubmit = async (data: DiaryForm) => {
    try {
      setIsLoading(true);
      setError('');

      const created_at = formatDate(data.created_at);
      data.created_at = created_at;
      
      const diary = await diaryService.createDiary(data);
      addDiary(diary);
      
      router.push('/diaries');
    } catch (err: any) {
      setError(err.response?.data?.message || '保存失败');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">写日记</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>新日记</CardTitle>
            <CardDescription>记录今天的心情和想法</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <Textarea
                  {...register('content')}
                  placeholder="写下你的想法..."
                  rows={30}
                  className="resize-none"
                  disabled={isLoading}
                />
                {errors.content && (
                  <p className="text-sm text-red-500 mt-1">{errors.content.message}</p>
                )}
              </div>
              {/* created_at */}
              <div>
                <Input
                  {...register('created_at')}
                  type="date"
                  defaultValue={new Date().toISOString().split('T')[0]}
                  placeholder="选择日期"
                />
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
                <Button disabled={isLoading} type="submit" >
                  <Save className="w-4 h-4 mr-2" />
                  {'保存'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
