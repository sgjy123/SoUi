# SoUi - 现代化 React 组件库

[![npm version](https://img.shields.io/npm/v/@soui/ui.svg)](https://www.npmjs.com/package/@soui/ui)
[![npm downloads](https://img.shields.io/npm/dm/@soui/ui.svg)](https://www.npmjs.com/package/@soui/ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

一个基于 React 18+、TypeScript、Vite 和 Less 构建的现代化企业级 UI 组件库。

## ✨ 特性

- 🎨 **完整设计系统** - 精心设计的色彩、间距、排版系统
- ⚡ **现代化技术栈** - React 18+, TypeScript, Vite, Less
- ♿ **无障碍访问** - 遵循 WAI-ARIA，支持键盘导航
- 🎯 **主题定制** - CSS Variables + ConfigProvider，支持暗黑模式
- 📦 **开箱即用** - 13+ 高质量组件，完整文档
- 🚀 **性能优化** - Tree Shaking，按需加载

## 📦 安装

```bash
npm install @soui/ui
# 或
yarn add @soui/ui
# 或
pnpm add @soui/ui
```

## 🚀 快速开始

```tsx
import { Button, Input, Card } from '@soui/ui';
import '@soui/ui/dist/soui.css';

function App() {
  return (
    <Card title="欢迎使用 SoUi">
      <Input placeholder="请输入" style={{ marginBottom: 16 }} />
      <Button type="primary">提交</Button>
    </Card>
  );
}
```

## 📖 文档

查看完整的文档和示例：

- [快速开始](https://soui-ui.dev/guide/quick-start)
- [组件总览](https://soui-ui.dev/components/button)
- [样式系统](https://soui-ui.dev/styles/overview)
- [主题定制](https://soui-ui.dev/theming/config-provider)

## 🎨 核心组件

### 基础组件
- [Button](https://soui-ui.dev/components/button) - 按钮
- [Icon](https://soui-ui.dev/components/icon) - 图标
- [Typography](https://soui-ui.dev/components/typography) - 排版

### 布局组件
- [Grid](https://soui-ui.dev/components/grid) - 栅格布局
- [Space](https://soui-ui.dev/components/space) - 间距

### 数据录入
- [Input](https://soui-ui.dev/components/input) - 输入框

### 数据展示
- [Card](https://soui-ui.dev/components/card) - 卡片
- [Tag](https://soui-ui.dev/components/tag) - 标签
- [Badge](https://soui-ui.dev/components/badge) - 徽标

### 反馈组件
- [Modal](https://soui-ui.dev/components/modal) - 对话框
- [Message](https://soui-ui.dev/components/message) - 全局提示
- [Alert](https://soui-ui.dev/components/alert) - 警告提示

## 🌈 主题定制

### 基础配置

```tsx
import { ConfigProvider } from '@soui/ui';

function App() {
  return (
    <ConfigProvider
      theme={{
        primaryColor: '#1677ff',
        borderRadius: 6,
      }}
    >
      <YourApp />
    </ConfigProvider>
  );
}
```

### 暗黑模式

```tsx
import { ConfigProvider, theme } from '@soui/ui';

function App() {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
      }}
    >
      <YourApp />
    </ConfigProvider>
  );
}
```

## 💻 开发

```bash
# 克隆项目
git clone https://github.com/souI/ui.git
cd SoUi

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 启动文档站点
npm run docs:dev

# 构建
npm run build

# 运行测试
npm test
```

## 🔧 技术栈

- **React** - ^18.2.0
- **TypeScript** - ~5.3.3
- **Vite** - ^4.5.0
- **Less** - ^4.2.0
- **VitePress** - ^1.0.0-rc.45
- **@icon-park/react** - ^1.4.2

## 🤝 贡献

我们欢迎各种形式的贡献！

- 💡 提交功能建议
- 🐛 报告 Bug
- 📝 改进文档
- 🎨 分享使用案例

查看 [贡献指南](https://soui-ui.dev/contributing) 了解更多。

## 📄 许可证

[MIT License](LICENSE)

## 🔗 链接

- [GitHub](https://github.com/souI/ui)
- [NPM](https://www.npmjs.com/package/@soui/ui)
- [文档站点](https://soui-ui.dev)
- [问题反馈](https://github.com/souI/ui/issues)

## 👥 团队

SoUi Team

---

Made with ❤️ by SoUi Team
