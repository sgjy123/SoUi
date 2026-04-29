# SoUi 设计基础

SoUi 的设计系统基于以下核心原则构建，确保组件库的视觉一致性和开发体验。

## 设计理念

### 1. 自然直观
- 遵循用户的心智模型
- 减少认知负担
- 提供清晰的视觉层次

### 2. 确定性
- 一致的设计语言
- 可预测的交互反馈
- 统一的视觉规范

### 3. 意义感
- 每个设计决策都有其目的
- 避免过度设计
- 注重实用性

## 核心价值

```tsx
// 使用示例
import { Button, ConfigProvider } from '@soui/ui';

function App() {
  return (
    <ConfigProvider
      theme={{
        primaryColor: '#1677ff',
        borderRadius: 6,
      }}
    >
      <Button type="primary">主要按钮</Button>
    </ConfigProvider>
  );
}
```

## 设计原则详解

### 🎨 色彩原则

1. **功能性** - 每种颜色都有明确的语义
2. **可访问性** - 确保足够的对比度
3. **灵活性** - 支持主题定制

### 📐 间距原则

1. **4px 基准** - 所有间距都是 4 的倍数
2. **比例关系** - 使用和谐的间距比例
3. **响应式** - 适配不同屏幕尺寸

### ✍️ 排版原则

1. **清晰易读** - 合适的字号和行高
2. **层次分明** - 明确的文字层级
3. **一致性** - 统一的字体家族

## 快速链接

- [色彩系统](/styles/colors) - 完整的色彩规范
- [间距系统](/styles/spacing) - 间距使用指南
- [排版系统](/styles/typography) - 字体和排版规范
- [阴影系统](/styles/shadows) - 阴影效果说明

## 下一步

开始使用 SoUi 构建您的应用：

- [安装指南](/guide/installation) - 安装和配置
- [快速开始](/guide/quick-start) - 5 分钟上手
- [组件总览](/components/button) - 查看所有组件
