# SoUi 文档使用指南

恭喜！SoUi 的文档系统已经搭建完成。本指南将帮助您快速上手。

## 📁 目录结构

```
SoUi/
├── src/
│   ├── components/          # 组件源码
│   └── docs/                # 📚 文档目录
│       ├── .vitepress/      # VitePress 配置
│       │   ├── config.ts    # 站点配置
│       │   └── theme/       # 主题定制
│       │       ├── index.ts
│       │       └── styles/
│       ├── guide/           # 指南文档
│       │   ├── introduction.md
│       │   ├── quick-start.md
│       │   └── installation.md
│       ├── styles/          # 样式文档
│       │   ├── overview.md
│       │   ├── colors.md
│       │   ├── spacing.md
│       │   └── typography.md
│       ├── theming/         # 主题文档
│       │   └── config-provider.md
│       ├── components/      # 组件文档
│       │   └── button.md
│       └── resources/       # 资源文档
│           └── changelog.md
└── package.json
```

## 🚀 快速启动

### 1. 安装依赖

```bash
cd SoUi
npm install
```

### 2. 启动文档开发服务器

```bash
npm run docs:dev
```

访问 http://localhost:5173 查看文档站点。

### 3. 构建生产版本

```bash
npm run docs:build
```

### 4. 预览构建结果

```bash
npm run docs:preview
```

## 📝 编写文档

### 基础语法

SoUi 文档使用 Markdown + MDX 语法，支持在 Markdown 中使用 React 组件。

**示例：**

```md
# 标题

这是普通文本。

## 代码示例

```tsx
import { Button } from '@soui/ui';

export default () => <Button>按钮</Button>;
```

## 表格

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| type | 类型 | `string` | `-` |
```

### 使用自定义组件

可以在文档中使用自定义的 React 组件来增强展示效果。

**创建组件示例：**

```tsx
// .vitepress/theme/components/ColorPalette.tsx
export default function ColorPalette({ colors }) {
  return (
    <div className="color-grid">
      {colors.map(color => (
        <div key={color.value} className="color-card">
          <div className="color-name">{color.name}</div>
          <div className="color-value">{color.value}</div>
        </div>
      ))}
    </div>
  );
}
```

**在文档中使用：**

```md
<ColorPalette 
  :colors="[
    { name: 'Primary', value: '#1677ff' },
    { name: 'Success', value: '#52c41a' }
  ]"
/>
```

## 🎨 主题定制

### 修改品牌色

编辑 `.vitepress/theme/styles/vars.css`：

```css
:root {
  --vp-c-brand: #your-color;
  --vp-c-brand-light: #your-light-color;
  --vp-c-brand-dark: #your-dark-color;
}
```

### 自定义布局

编辑 `.vitepress/config.ts`：

```typescript
export default defineConfig({
  themeConfig: {
    // 导航栏配置
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/introduction' },
    ],
    
    // 侧边栏配置
    sidebar: {
      '/guide/': sidebarGuide(),
      '/styles/': sidebarStyles(),
    },
  },
});
```

## 📋 文档规范

### 文件命名

- 使用小写字母
- 单词间用中划线连接
- 例如：`quick-start.md`, `config-provider.md`

### 目录结构

每个模块的文档应该放在对应的目录下：

- **指南** → `guide/`
- **样式** → `styles/`
- **主题** → `theming/`
- **组件** → `components/`
- **资源** → `resources/`

### 内容结构

每个文档页面应该包含：

1. **标题** - 清晰的 H1 标题
2. **何时使用** - 说明使用场景
3. **代码演示** - 丰富的示例
4. **API 文档** - 完整的属性说明
5. **最佳实践** - ✅ 推荐和 ❌ 避免
6. **相关资源** - 链接到相关文档

## 🔧 高级功能

### 添加搜索功能

VitePress 内置搜索，无需额外配置。如需自定义，编辑 `config.ts`：

```typescript
search: {
  provider: 'local',
  options: {
    locales: {
      root: {
        translations: {
          button: { buttonText: '搜索' },
        },
      },
    },
  },
},
```

### 多语言支持

```typescript
export default defineConfig({
  locales: {
    root: {
      label: '中文',
      lang: 'zh-CN',
    },
    en: {
      label: 'English',
      lang: 'en',
      link: '/en/',
    },
  },
});
```

### 部署到生产环境

#### GitHub Pages

**.github/workflows/deploy.yml**
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm install
      - run: npm run docs:build
      
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: src/docs/.vitepress/dist
```

#### Vercel

1. 在 Vercel 导入项目
2. 设置构建命令：`npm run docs:build`
3. 设置输出目录：`src/docs/.vitepress/dist`

#### Netlify

**netlify.toml**
```toml
[build]
  command = "npm run docs:build"
  publish = "src/docs/.vitepress/dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## 🐛 常见问题

### Q: 本地预览时样式错乱？

**A:** 确保安装了所有依赖并正确引入了 CSS 文件。

```bash
npm install
npm run docs:dev
```

### Q: 如何添加自定义字体？

**A:** 在 `.vitepress/theme/styles/vars.css` 中添加：

```css
:root {
  --vp-font-family-base: 'Your Font', sans-serif;
  --vp-font-family-mono: 'Your Mono Font', monospace;
}
```

### Q: 如何禁用暗黑模式？

**A:** 在 `config.ts` 中配置：

```typescript
export default defineConfig({
  themeConfig: {
    appearance: false, // 禁用暗黑模式切换
  },
});
```

## 📊 SEO 优化

### 元标签配置

```typescript
export default defineConfig({
  title: 'SoUi - 现代化 React 组件库',
  description: '基于 React 18+、TypeScript 的企业级 UI 组件库',
  head: [
    ['meta', { name: 'keywords', content: 'React, UI, Components, TypeScript' }],
    ['link', { rel: 'canonical', href: 'https://soui-ui.dev' }],
  ],
});
```

### Open Graph

```typescript
head: [
  ['meta', { property: 'og:title', content: 'SoUi' }],
  ['meta', { property: 'og:description', content: '现代化 React 组件库' }],
  ['meta', { property: 'og:image', content: '/og-image.png' }],
]
```

## 🎯 下一步

1. **完善组件文档** - 为所有组件编写详细文档
2. **添加更多示例** - 丰富代码演示
3. **自定义组件** - 创建交互式示例组件
4. **部署上线** - 发布到生产环境

## 📚 学习资源

- [VitePress 官方文档](https://vitepress.dev/)
- [Markdown 语法](https://commonmark.org/help/)
- [MDX 文档](https://mdxjs.com/)

---

**祝您的文档建设顺利！** 🎉

如有问题，请查看 [VitePress 官方文档](https://vitepress.dev/) 或在 GitHub 提问。
