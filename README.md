# 多功能Web项目

这个项目包含两个独立的Web应用：

## 1. Start Bootstrap Resume - 简历模板

一个优雅的简历和CV主题，基于Bootstrap构建。

### 功能特性
- 固定侧边栏设计
- 响应式布局
- 简洁优雅的界面
- 易于定制

### 使用方法
```bash
# 安装依赖
npm install

# 启动开发服务器
npm start

# 构建项目
npm run build
```

### 访问地址
- 主页面：`dist/index.html`
- 或运行 `npm start` 后访问本地服务器

## 2. 登录注册系统

一个现代化的、响应式的登录注册页面，具有完整的表单验证和用户交互功能。

### 功能特性
- **现代化设计**: 采用渐变背景和卡片式布局
- **响应式布局**: 适配各种屏幕尺寸
- **完整的表单验证**: 实时输入验证、密码强度检测
- **交互功能**: 表单切换、密码显示/隐藏、通知系统
- **社交登录**: Google、GitHub登录支持
- **键盘快捷键**: Ctrl+L/R切换表单，Esc清除内容

### 使用方法
```bash
# 进入public目录
cd public

# 启动HTTP服务器
python3 -m http.server 8000

# 在浏览器中访问
# http://localhost:8000/login.html
```

### 访问地址
- 登录注册页面：`public/login.html`

## 项目结构

```
test/
├── dist/                    # 简历模板构建文件
│   ├── index.html          # 简历主页面
│   ├── css/               # 样式文件
│   ├── js/                # JavaScript文件
│   └── assets/            # 图片等资源
├── public/                 # 登录注册系统
│   ├── login.html         # 登录注册页面
│   ├── style.css          # 样式文件
│   └── script.js          # JavaScript交互文件
├── src/                   # 简历模板源代码
│   ├── pug/              # Pug模板文件
│   ├── scss/             # SCSS样式文件
│   ├── js/               # JavaScript源代码
│   └── assets/           # 原始资源文件
├── scripts/              # 构建脚本
├── package.json          # npm配置文件
└── README.md            # 项目说明文档
```

## 快速开始

### 使用简历模板
```bash
npm install
npm start
# 访问 http://localhost:3000
```

### 使用登录注册系统
```bash
cd public
python3 -m http.server 8000
# 访问 http://localhost:8000/login.html
```

## 许可证

两个项目都采用MIT许可证。您可以自由使用、修改和分发此代码。

## 贡献

欢迎提交Issue和Pull Request来改进这个项目。

## 联系

如有问题或建议，请通过GitHub Issues联系我们。
