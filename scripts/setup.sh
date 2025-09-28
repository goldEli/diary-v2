#!/bin/bash

echo "🚀 开始设置日记管理项目..."

# 检查Node.js版本
if ! command -v node &> /dev/null; then
    echo "❌ 请先安装Node.js 18+"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js版本过低，请升级到18+"
    exit 1
fi

# 检查pnpm
if ! command -v pnpm &> /dev/null; then
    echo "📦 安装pnpm..."
    npm install -g pnpm
fi

# 检查Docker
if ! command -v docker &> /dev/null; then
    echo "❌ 请先安装Docker"
    exit 1
fi

# 创建环境变量文件
if [ ! -f "backend/.env" ]; then
    echo "📝 创建环境变量文件..."
    cat > backend/.env << EOF
# 数据库配置
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=password
DB_DATABASE=diary_db

# JWT配置
JWT_SECRET=your-super-secret-jwt-key-change-in-production

# 应用配置
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
EOF
    echo "✅ 环境变量文件已创建: backend/.env"
fi

# 安装后端依赖
echo "📦 安装后端依赖..."
cd backend
pnpm install

# 启动Docker服务
echo "🐳 启动Docker服务..."
cd ..
docker-compose up -d mysql

# 等待数据库启动
echo "⏳ 等待数据库启动..."
sleep 10

# 启动后端服务
echo "🚀 启动后端服务..."
cd backend
pnpm run start:dev &

echo "✅ 设置完成！"
echo "📚 API文档: http://localhost:3001/api"
echo "🔧 后端服务: http://localhost:3001"
echo "🗄️  数据库: localhost:3306"
