# 日记管理后端API

基于NestJS的日记管理后端服务。

## 🚀 快速开始

### 环境要求
- Node.js 18+
- MySQL 8.0+
- pnpm

### 环境变量配置

创建 `.env` 文件并配置以下变量：

```bash
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
```

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
pnpm run start:dev
```

### 构建生产版本

```bash
pnpm run build
pnpm run start:prod
```

## 📚 API文档

启动服务后，访问 http://localhost:3001/api 查看Swagger API文档。

## 🐳 Docker部署

```bash
# 构建镜像
docker build -t diary-backend .

# 运行容器
docker run -p 3001:3001 --env-file .env diary-backend
```

## 🧪 测试

```bash
# 单元测试
pnpm run test

# E2E测试
pnpm run test:e2e

# 测试覆盖率
pnpm run test:cov
```

## 📝 代码规范

```bash
# 代码格式化
pnpm run format

# 代码检查
pnpm run lint
```