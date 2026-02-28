# GameTrend Radar - 打包版本

## 📦 包含内容

- `frontend/` - 前端构建文件（可直接部署到Web服务器）
- `backend/` - 后端构建文件和配置

## 🚀 快速启动指南

### 前置要求

1. Node.js 18 或更高版本
2. 下载地址：https://nodejs.org/

### 后端启动步骤

1. **进入后端目录**
   ```bash
   cd backend
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **配置环境变量**
   
   复制环境变量模板：
   ```bash
   copy .env.example .env
   ```
   
   编辑 `.env` 文件，设置YouTube API密钥（可选）：
   ```env
   YOUTUBE_API_KEY=your_youtube_api_key_here
   ```

4. **初始化数据库**
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

5. **启动后端服务**
   ```bash
   npm run start:prod
   ```
   
   后端将运行在：http://localhost:4000

### 前端部署方式

#### 方式1：使用本地Web服务器（推荐用于测试）

1. **安装全局HTTP服务器**
   ```bash
   npm install -g http-server
   ```

2. **启动前端服务**
   ```bash
   cd frontend
   http-server -p 5173
   ```
   
   前端将运行在：http://localhost:5173

#### 方式2：部署到Web服务器

将 `frontend` 目录中的所有文件上传到您的Web服务器（如Nginx、Apache等）。

#### 方式3：使用Node.js静态服务器

1. **在项目根目录创建server.js**
   ```javascript
   const express = require('express');
   const path = require('path');
   const app = express();

   app.use(express.static(path.join(__dirname, 'frontend')));
   app.get('*', (req, res) => {
     res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
   });

   app.listen(5173, () => {
     console.log('Frontend server running on http://localhost:5173');
   });
   ```

2. **安装Express并启动**
   ```bash
   npm install express
   node server.js
   ```

## 📝 使用说明

1. **确保后端服务正在运行**（http://localhost:4000）
2. **确保前端服务正在运行**（http://localhost:5173）
3. **在浏览器中访问**：http://localhost:5173
4. **添加示例数据**：访问 http://localhost:4000/games/seed
5. **刷新前端页面**，查看游戏数据

## 🔧 API端点

- `GET /games` - 获取所有游戏
- `GET /games?minScore=2` - 获取分数>=2的游戏
- `POST /games/seed` - 添加示例游戏数据
- `POST /daily-job` - 运行完整检测流程

## 📊 功能说明

- **游戏抓取**：从itch.io和CrazyGames抓取最新游戏
- **趋势分析**：使用Google Trends分析游戏热度
- **YouTube检测**：分析游戏相关视频数量
- **自动评分**：综合计算游戏推荐分数
- **定时任务**：每天自动执行检测

## 🛠️ 故障排除

### 后端无法启动

```bash
# 检查端口是否被占用
netstat -ano | findstr :4000

# 结束占用端口的进程
taskkill /PID <进程ID> /F
```

### 前端无法连接后端

1. 确保后端服务正在运行
2. 检查CORS配置
3. 确认后端运行在正确的端口（4000）

### 数据库错误

```bash
# 删除现有数据库
del backend\prisma\dev.db

# 重新初始化
npx prisma migrate dev --name init
```

## 📞 技术支持

如有问题，请检查：
1. Node.js版本是否符合要求
2. 所有依赖是否正确安装
3. 环境变量是否正确配置
4. 端口是否被其他程序占用

## 📄 许可证

本项目仅供学习和研究使用。
