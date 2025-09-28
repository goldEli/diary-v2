import { redirect } from 'next/navigation';

export default function HomePage() {
  // 在服务端重定向到登录页面
  redirect('/login');
}