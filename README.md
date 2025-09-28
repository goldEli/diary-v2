# 日记管理H5应用

一个基于现代技术栈的移动端日记管理应用，只支持用户登录、日记的增删改查，并部署到云端供随时访问。

## 📋 功能需求

### 核心功能
- **用户认证系统**
  - 用户登录
  - JWT身份验证
  - 密码加密存储
  - 自动登录状态保持

- **日记管理**
  - 创建新日记
  - 查看日记列表（分页）
  - 查看单篇日记详情
  - 编辑已有日记
  - 删除日记
  - 日记搜索功能
  - 按日期筛选日记

- **用户体验**
  - 响应式设计，适配移动端

## 🛠 技术栈

### 前端技术栈
- **框架**: Next.js 15 (App Router)
- **依赖管理**: pnpm
- **样式**: Tailwind CSS + Shadcn UI
- **状态管理**: Zustand
- **HTTP客户端**: Axios
- **表单处理**: React Hook Form + Zod
- **日期处理**: Day.js

### 后端技术栈
- **框架**: NestJS
- **数据库**: MySQL 8.0
- **ORM**: TypeORM
- **认证**: JWT + Passport
- **密码加密**: bcrypt
- **文件上传**: Multer
- **数据验证**: class-validator + class-transformer
- **API文档**: Swagger
- **日志**: Winston

### API 设计

POST /auth/login

GET /diaries（获取用户日记）

POST /diaries（新增日记）

PUT /diaries/:id（编辑日记）

DELETE /diaries/:id（删除日记）

### 部署与运维
- **容器化**: Docker + Docker Compose
- **CI/CD**: GitHub Actions

## 📁 项目结构

```
diary-v2/
├── frontend/                 # Next.js 前端应用
│   ├── app/                 # App Router 页面
│   ├── components/          # 可复用组件
│   ├── lib/                 # 工具函数和配置
│   ├── hooks/               # 自定义Hooks
│   ├── store/               # Zustand状态管理
│   └── types/               # TypeScript类型定义
├── backend/                 # NestJS 后端应用
│   ├── src/
│   │   ├── auth/            # 认证模块
│   │   ├── users/           # 用户模块
│   │   ├── diaries/         # 日记模块
│   │   ├── upload/          # 文件上传模块
│   │   └── common/          # 公共模块
│   └── test/                # 测试文件
├── docker/                  # Docker配置文件
├── docs/                    # 项目文档
└── scripts/                 # 部署脚本
```

## 🚀 快速开始

### 环境要求
- Node.js 18+
- Docker & Docker Compose
- MySQL 8.0+
- Git

### 本地开发

1. **克隆项目**
```bash
git clone <repository-url>
cd diary-v2
```

2. **启动后端服务**
```bash
cd backend
pnpm install
pnpm run start:dev
```

3. **启动前端服务**
```bash
cd frontend
pnpm install
pnpm run dev
```

4. **访问应用**
- 前端: http://localhost:3000
- 后端API: http://localhost:3001
- API文档: http://localhost:3001/api

### Docker部署

```bash
# 构建并启动所有服务
docker-compose up -d

# 查看服务状态
docker-compose ps

# 查看日志
docker-compose logs -f
```

## 📊 数据库设计

### 用户表 (users)
- id, email, password, created_at, updated_at

### 日记表 (diaries)
- id, user_id, title, content, created_at, updated_at

### 标签表 (tags)
- id, name, color, user_id, created_at

### 日记标签关联表 (diary_tags)
- diary_id, tag_id

## 🔌 API接口设计

### 认证接口

#### 用户登录
```http
POST /auth/login
Content-Type: application/json

{
  "email": "string",
  "password": "string"
}
```

**响应:**
```json
{
  "access_token": "jwt-token",
  "user": {
    "id": 1,
    "email": "user@example.com"
  }
}
```

#### 用户注册
```http
POST /auth/register
Content-Type: application/json

{
  "email": "string",
  "password": "string"
}
```

### 用户接口

#### 获取用户信息
```http
GET /users/{id}
Authorization: Bearer {token}
```

#### 更新用户信息
```http
PUT /users/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "email": "string"
}
```

#### 删除用户
```http
DELETE /users/{id}
Authorization: Bearer {token}
```

### 日记接口

#### 创建日记
```http
POST /diaries
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "string",
  "content": "string"
}
```

#### 获取日记列表
```http
GET /diaries?page=1&limit=10
Authorization: Bearer {token}
```

**响应:**
```json
{
  "data": [
    {
      "id": 1,
      "title": "日记标题",
      "content": "日记内容",
      "created_at": "2024-01-01T00:00:00Z",
      "updated_at": "2024-01-01T00:00:00Z"
    }
  ],
  "total": 100
}
```

#### 搜索日记
```http
GET /diaries/search?keyword=关键词&page=1&limit=10
Authorization: Bearer {token}
```

#### 获取单篇日记
```http
GET /diaries/{id}
Authorization: Bearer {token}
```

#### 更新日记
```http
PUT /diaries/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "string",
  "content": "string"
}
```

#### 删除日记
```http
DELETE /diaries/{id}
Authorization: Bearer {token}
```


### 错误响应格式

```json
{
  "statusCode": 400,
  "message": "错误描述",
  "error": "Bad Request"
}
```

### 状态码说明

- `200` - 成功
- `201` - 创建成功
- `400` - 请求参数错误
- `401` - 未授权
- `403` - 禁止访问
- `404` - 资源不存在
- `500` - 服务器内部错误

## 🌐 部署架构

Docker Compose（本地/服务器）


## 🧪 测试策略

- **单元测试**: Jest + Testing Library
- **集成测试**: Supertest
- **E2E测试**: Playwright
- **API测试**: Postman/Newman

## 📝 开发规范

- **代码规范**: ESLint + Prettier
- **提交规范**: Conventional Commits
- **分支策略**: Git Flow
- **代码审查**: Pull Request

## 🔄 CI/CD流程

1. 代码提交 → GitHub
2. 自动触发GitHub Actions
3. 运行测试和代码检查
4. 构建Docker镜像
5. 推送到阿里云容器镜像服务
6. 自动部署到阿里云ECS

## 📞 联系方式

如有问题，请提交Issue或联系开发团队。

## 📄 许可证

MIT License
