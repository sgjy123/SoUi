# 🚀 快速启动 SoUi 文档

## 立即开始

### 步骤 1: 安装依赖（如果还没安装）

```bash
cd d:\JavaWorkSpace\myWork\ant-design-master\SoUi
npm install
```

### 步骤 2: 启动文档开发服务器

```bash
npm run docs:dev
```

### 步骤 3: 访问文档站点

打开浏览器访问：**http://localhost:5173**

## 📋 可用命令

```bash
# 开发模式
npm run docs:dev      # 启动热重载开发服务器

# 生产构建
npm run docs:build    # 构建静态站点

# 预览构建结果
npm run docs:preview  # 本地预览生产构建
```

## 📁 文档位置

所有文档都在这个目录：
```
SoUi/src/docs/
```

### 主要文档文件

```
docs/
├── GUIDE.md              # 📖 文档使用指南（必读）
├── SUMMARY.md            # 📊 完整总结文档
├── guide/                # 新手指南
│   ├── introduction.md   # SoUi 介绍
│   ├── quick-start.md    # 快速开始
│   └── installation.md   # 安装指南
├── styles/               # 🎨 样式文档
│   ├── overview.md       # 设计概览
│   ├── colors.md         # 色彩系统
│   └── spacing.md        # 间距系统
├── theming/              # 🎯 主题文档
│   └── config-provider.md
├── components/           # 🧩 组件文档
│   └── button.md         # Button 示例
└── resources/            # 📋 资源文档
    └── changelog.md      # 更新日志
```

## 🔧 配置文件

```
.vitepress/
├── config.ts             # ⚙️ VitePress 配置
└── theme/
    ├── index.ts          # 🎨 主题入口
    └── styles/
        ├── vars.css      # 🎨 品牌色变量
        └── custom.css    # 🎨 自定义样式
```

## ✨ 特性一览

### 📖 文档内容

- ✅ **3 篇指南文档** - 介绍、快速开始、安装
- ✅ **3 篇样式文档** - 色彩、间距、概览
- ✅ **1 篇主题文档** - ConfigProvider 完整指南
- ✅ **1 篇组件文档** - Button 完整 API
- ✅ **1 篇资源文档** - 更新日志

### 🎨 设计系统

- ✅ 完整的色彩系统说明
- ✅ 基于 4px 的间距系统
- ✅ Design Tokens 管理
- ✅ CSS Variables 支持

### 🛠️ 技术栈

- ✅ VitePress 1.0+ (最新)
- ✅ React 18+ 支持
- ✅ TypeScript 类型
- ✅ Less 预处理器

### 📱 功能特性

- ✅ 实时搜索
- ✅ 暗黑模式
- ✅ 响应式设计
- ✅ 编辑链接
- ✅ 代码高亮

## 🎯 下一步做什么？

### 选项 A: 查看现有文档

1. 运行 `npm run docs:dev`
2. 访问 http://localhost:5173
3. 浏览各个页面查看效果

### 选项 B: 添加新组件文档

创建 `docs/components/input.md`：

```md
# Input 输入框

## 何时使用

需要用户输入文本或数据时。

## 代码演示

### 基础用法

```tsx
import { Input } from '@soui/ui';

export default () => <Input placeholder="请输入" />;
```

## API

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| value | 输入值 | `string` | - |
| onChange | 变化回调 | `(e) => void` | - |
```

### 选项 C: 自定义主题

编辑 `.vitepress/theme/styles/vars.css`：

```css
:root {
  --vp-c-brand: #your-color;  /* 修改品牌色 */
}
```

### 选项 D: 部署上线

参考 `GUIDE.md` 中的部署章节，选择：
- GitHub Pages
- Vercel
- Netlify

## 💡 常用技巧

### 快速导航

- `/guide/introduction` - 介绍页
- `/styles/colors` - 色彩系统
- `/components/button` - 按钮组件
- `/theming/config-provider` - 主题配置

### 添加新页面

1. 在对应目录创建 `.md` 文件
2. 在 `config.ts` 的 sidebar 中添加路由
3. 重启开发服务器（如果需要）

### 自定义样式

在 `.vitepress/theme/styles/custom.css` 中添加：

```css
.my-custom-class {
  color: red;
}
```

## 🐛 遇到问题？

### 常见问题速查

**Q: 启动失败？**
```bash
# 清除缓存重新安装
rm -rf node_modules package-lock.json
npm install
```

**Q: 样式不生效？**
```bash
# 确保安装了 Less
npm install less -D
```

**Q: 端口被占用？**
```bash
# 使用其他端口
npx vitepress dev src/docs --port 3000
```

### 获取帮助

1. 查看 `GUIDE.md` - 详细使用指南
2. 查看 `SUMMARY.md` - 完整总结
3. 访问 [VitePress 官方文档](https://vitepress.dev/)

## 🎉 开始探索吧！

```bash
npm run docs:dev
```

然后打开浏览器，开始您的 SoUi 文档之旅！✨

---

**提示**: 建议先通读 `GUIDE.md` 了解完整的文档系统使用方法。
