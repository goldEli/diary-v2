'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useDiaryStore } from '@/store/diary';
import { diaryService } from '@/lib/services/diary';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, LogOut, Search } from 'lucide-react';
import AuthGuard from '@/components/AuthGuard';

export default function DiariesPage() {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  const router = useRouter();
  const { user, logout } = useAuth();
  const { diaries, setDiaries, setLoading, loading } = useDiaryStore();

  useEffect(() => {
    loadDiaries();
  }, [currentPage]);

  const loadDiaries = async () => {
    try {
      setLoading(true);
      const response = await diaryService.getDiaries(currentPage, 10);
      setDiaries(response.data);
      setTotalPages(Math.ceil(response.total / 10));
    } catch (error) {
      console.error('加载日记失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchKeyword.trim()) {
      loadDiaries();
      return;
    }

    try {
      setLoading(true);
      const response = await diaryService.searchDiaries(searchKeyword, currentPage, 10);
      setDiaries(response.data);
      setTotalPages(Math.ceil(response.total / 10));
    } catch (error) {
      console.error('搜索失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">我的日记</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">欢迎，{user?.email}</span>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              退出
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-4 flex-1">
            <input
              type="text"
              placeholder="搜索日记..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button onClick={handleSearch}>
              <Search className="w-4 h-4 mr-2" />
              搜索
            </Button>
          </div>
          <Button onClick={() => router.push('/diaries/new')}>
            <Plus className="w-4 h-4 mr-2" />
            写日记
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-8">加载中...</div>
        ) : diaries.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-gray-500">还没有日记，开始写第一篇吧！</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {diaries.map((diary) => (
              <Card key={diary.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{diary.title}</CardTitle>
                  <CardDescription>{formatDate(diary.created_at)}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 line-clamp-3">{diary.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                上一页
              </Button>
              <span className="px-4 py-2 text-sm text-gray-600">
                第 {currentPage} 页，共 {totalPages} 页
              </span>
              <Button
                variant="outline"
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
              >
                下一页
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
    </AuthGuard>
  );
}
