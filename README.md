# 转转菜谱 - uni-app 跨平台美食应用

一个基于 uni-app 框架开发的跨平台美食菜谱应用，支持多端部署（H5、微信小程序、App 等）。

## 项目简介

转转菜谱是一个为美食爱好者打造的菜谱分享平台，用户可以浏览各类菜谱、搜索美食、收藏喜欢的菜品，还可以自己创作并分享菜谱。

## 功能特性

### 核心功能
- **首页推荐**：轮播图展示、经典美食推荐、分类浏览
- **菜谱分类**：按食材、菜系等分类浏览
- **搜索功能**：支持菜谱名称、食材等关键词搜索
- **菜谱详情**：查看详细做法、食材清单、步骤图解
- **用户系统**：注册、登录、个人信息管理
- **创作发布**：用户可以创建并发布自己的菜谱
- **收藏管理**：收藏喜欢的菜谱，方便随时查看
- **我的发布**：管理自己发布的菜谱

### 技术特性
- 跨平台支持（H5、小程序、App）
- 响应式设计，适配不同屏幕尺寸
- 组件化开发，代码复用率高
- API 接口封装，便于维护

## 技术栈

- **前端框架**：Vue 3 + uni-app
- **UI 组件库**：vk-uview-ui
- **构建工具**：Vite
- **样式预处理**：SCSS
- **状态管理**：Vue 3 Composition API
- **国际化**：vue-i18n（支持多语言）

## 项目结构

```
zhuanzhuanuniapp/
├── src/
│   ├── api/                    # API 接口
│   │   ├── index.js           # 首页相关接口
│   │   ├── goods.js           # 商品接口
│   │   ├── user.js            # 用户接口
│   │   ├── collection.js      # 收藏接口
│   │   └── unused.js          # 其他接口
│   ├── common/                # 公共模块
│   │   └── http.js            # HTTP 请求封装
│   ├── pages/                 # 页面组件
│   │   ├── index/             # 首页
│   │   ├── category/          # 分类页
│   │   ├── search/            # 搜索页
│   │   ├── details/           # 菜谱详情页
│   │   ├── login/             # 登录页
│   │   ├── register/          # 注册页
│   │   ├── mine/              # 个人中心
│   │   ├── write/             # 创作页
│   │   ├── collection/        # 收藏页
│   │   └── userwirter/        # 我的发布
│   ├── static/                # 静态资源
│   │   ├── tab/               # 底部导航图标
│   │   └── ...                # 其他图片资源
│   ├── uni_modules/           # uni-app 插件
│   │   └── vk-uview-ui/       # uview 组件库
│   ├── App.vue                # 应用入口
│   ├── main.js                # 主入口文件
│   ├── manifest.json          # 应用配置
│   ├── pages.json             # 页面路由配置
│   └── uni.scss               # 全局样式
├── .gitignore                 # Git 忽略配置
├── index.html                 # H5 入口
├── package.json               # 项目依赖
├── vite.config.js             # Vite 配置
└── README.md                  # 项目说明
```

## 安装与运行

### 环境要求
- Node.js >= 14.0.0
- npm >= 6.0.0 或 yarn >= 1.0.0
- HBuilderX（推荐用于 uni-app 开发）

### 安装依赖
```bash
npm install
# 或
yarn install
```

### 运行项目

#### H5 端
```bash
npm run dev:h5
```

#### 微信小程序
```bash
npm run dev:mp-weixin
```

#### App 端
```bash
npm run dev:app
```

### 构建项目

#### H5 端
```bash
npm run build:h5
```

#### 微信小程序
```bash
npm run build:mp-weixin
```

#### App 端
```bash
npm run build:app
```

## 配置说明

### API 配置
API 接口地址配置在 `src/common/http.js` 文件中，可以根据环境修改：
- 开发环境：本地或测试服务器地址
- 生产环境：正式服务器地址

### 应用配置
- `src/manifest.json`：应用名称、版本、权限等配置
- `src/pages.json`：页面路由、导航栏、底部 Tab 配置

## 主要页面说明

1. **登录/注册页**：用户身份验证
2. **首页**：轮播图、推荐菜谱、分类入口
3. **分类页**：按食材、菜系分类浏览
4. **搜索页**：关键词搜索菜谱
5. **详情页**：菜谱详细信息、做法步骤
6. **创作页**：创建新菜谱
7. **个人中心**：个人信息、我的发布、收藏
8. **收藏页**：已收藏的菜谱列表

## 开发说明

### 添加新页面
1. 在 `src/pages/` 目录下创建页面组件
2. 在 `src/pages.json` 中添加页面路由
3. 如需底部 Tab，在 `tabBar.list` 中配置

### API 接口开发
1. 在 `src/api/` 目录下创建接口文件
2. 使用 `src/common/http.js` 封装的请求方法
3. 在页面中调用接口获取数据

### 组件使用
项目使用 vk-uview-ui 组件库，具体组件用法参考 [uview 官方文档](https://uviewui.com/)

## 注意事项

1. 首次运行前请确保已安装所有依赖
2. 微信小程序需要配置 AppID
3. App 端需要配置签名和证书
4. 生产环境请修改 API 地址为正式地址

## 更新日志

### v1.0.0 (2024-01-01)
- 项目初始化
- 实现基础功能：登录、注册、首页、分类、搜索、详情、创作、收藏
- 支持 H5、微信小程序、App 多端部署

## 许可证

本项目仅供学习交流使用。

## 联系方式

如有问题或建议，请提交 Issue 或联系开发者。