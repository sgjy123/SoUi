# 色彩系统

SoUi 的色彩系统经过精心设计，既保证了视觉美观，又兼顾了功能性和可访问性。

## 品牌色

品牌色用于传达品牌识别度和主要操作状态。

<ColorPalette 
  :colors="[
    { name: 'Primary', value: '#1677ff', desc: '主色调，用于主要操作和重要信息' },
    { name: 'Hover', value: '#4096ff', desc: '悬停状态' },
    { name: 'Active', value: '#0958d9', desc: '激活状态' },
  ]"
/>

## 功能色

功能色具有明确的语义，用于表示不同的状态和反馈。

<FunctionalColors
  :colors="[
    { 
      name: '成功', 
      value: '#52c41a', 
      variable: '@success-color',
      usage: '成功状态、确认操作、正向反馈'
    },
    { 
      name: '警告', 
      value: '#faad14', 
      variable: '@warning-color',
      usage: '警示提示、需要注意的状态'
    },
    { 
      name: '错误', 
      value: '#ff4d4f', 
      variable: '@error-color',
      usage: '错误状态、删除操作、危险提示'
    },
    { 
      name: '信息', 
      value: '#1677ff', 
      variable: '@info-color',
      usage: '信息提示、一般性说明'
    },
  ]"
/>

## 中性色

中性色用于文本、背景和边框等基础元素。

### 文字颜色

<ColorGroup
  title="文字颜色"
  :colors="[
    { name: '主要文字', value: 'rgba(0, 0, 0, 0.88)', variable: '@text-color' },
    { name: '次要文字', value: 'rgba(0, 0, 0, 0.65)', variable: '@text-color-secondary' },
    { name: '禁用文字', value: 'rgba(0, 0, 0, 0.25)', variable: '@text-color-disabled' },
    { name: '反色文字', value: '#ffffff', variable: '@text-color-inverse' },
  ]"
/>

### 背景颜色

<ColorGroup
  title="背景颜色"
  :colors="[
    { name: '基础背景', value: '#ffffff', variable: '@bg-color-base' },
    { name: '容器背景', value: '#ffffff', variable: '@bg-color-container' },
    { name: '布局背景', value: '#f5f5f5', variable: '@bg-color-layout' },
    { name: '禁用背景', value: '#f5f5f5', variable: '@bg-color-disable' },
  ]"
/>

### 边框颜色

<ColorGroup
  title="边框颜色"
  :colors="[
    { name: '边框', value: '#d9d9d9', variable: '@border-color' },
    { name: '分割线', value: '#f0f0f0', variable: '@border-color-split' },
    { name: '反色边框', value: '#ffffff', variable: '@border-color-inverse' },
  ]"
/>

## 使用方式

### 1. Less 变量

在 Less 样式文件中使用预定义的颜色变量：

```less
@import '@soui/ui/dist/soui.css';

.my-button {
  background-color: @primary-color;
  
  &:hover {
    background-color: @primary-hover-color;
  }
}

.success-message {
  color: @success-color;
  border-color: @success-color;
}
```

### 2. CSS Variables

在运行时动态修改颜色（推荐用于主题切换）：

```tsx
// 内联样式
<div style={{ 
  '--soui-primary-color': '#custom-color' 
} as React.CSSProperties}>
  <Button type="primary">自定义主题</Button>
</div>

// 全局样式
<style>
  :root {
    --soui-primary-color: #your-color;
    --soui-success-color: #your-success-color;
  }
</style>
```

### 3. ConfigProvider

通过 ConfigProvider 统一配置主题颜色：

```tsx
import { ConfigProvider, Button } from '@soui/ui';

function App() {
  return (
    <ConfigProvider
      theme={{
        primaryColor: '#1677ff',
        successColor: '#52c41a',
        warningColor: '#faad14',
        errorColor: '#ff4d4f',
      }}
    >
      <Button type="primary">主要按钮</Button>
    </ConfigProvider>
  );
}
```

## 最佳实践

### ✅ 推荐用法

```tsx
// 1. 使用语义化的颜色
<Button type="primary">提交</Button>
<Button danger>删除</Button>

// 2. 保持颜色使用的一致性
<Message type="success">操作成功</Message>
<Message type="error">操作失败</Message>

// 3. 使用主题配置
<ConfigProvider theme={{ primaryColor: brandColor }}>
  <App />
</ConfigProvider>
```

### ❌ 避免使用

```tsx
// 1. 避免硬编码颜色值
<div style={{ color: '#1677ff' }}> // 不推荐
  文本内容
</div>

// 2. 避免混用不同体系的颜色
<div className="custom" style={{ 
  backgroundColor: '#1677ff', // 硬编码
  color: 'var(--soui-text-color)' // CSS 变量
}}>
  混用颜色体系
</div>

// 3. 避免使用未定义的颜色
<div style={{ color: '#123456' }}> // 不推荐
  使用不在设计系统中的颜色
</div>
```

## 无障碍设计

SoUi 的色彩系统遵循 WCAG 2.1 AA 标准，确保足够的对比度：

### 对比度要求

| 元素类型 | 最小对比度 | 示例 |
|---------|-----------|------|
| 普通文本 | 4.5:1 | 正文、标题 |
| 大号文本 | 3:1 | 18px+ 粗体、24px+ 常规 |
| UI 组件 | 3:1 | 按钮、图标、边框 |

### 对比度检查工具

推荐使用以下工具检查颜色对比度：

- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Contrast Ratio](https://contrast-ratio.com/)
- [Stark Plugin](https://www.getstark.co/) (Figma/Sketch 插件)

## 暗黑模式

SoUi 支持暗黑模式，颜色会自动适配：

```tsx
<ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
  <App />
</ConfigProvider>
```

暗黑模式下的颜色调整：

- 品牌色亮度提升，确保在深色背景上清晰可见
- 降低背景色对比度，减少视觉疲劳
- 调整文字透明度，保证可读性

## 完整颜色列表

以下是所有可用的 Less 变量和 CSS 变量：

| 用途 | Less 变量 | CSS 变量 | 值 |
|------|----------|----------|-----|
| 主色 | `@primary-color` | `--soui-primary-color` | #1677ff |
| 主色悬停 | `@primary-hover-color` | `--soui-primary-hover-color` | #4096ff |
| 主色激活 | `@primary-active-color` | `--soui-primary-active-color` | #0958d9 |
| 成功色 | `@success-color` | `--soui-success-color` | #52c41a |
| 警告色 | `@warning-color` | `--soui-warning-color` | #faad14 |
| 错误色 | `@error-color` | `--soui-error-color` | #ff4d4f |
| 信息色 | `@info-color` | `--soui-info-color` | #1677ff |

## 相关资源

- [排版系统](/styles/typography) - 学习如何搭配文字
- [阴影系统](/styles/shadows) - 了解阴影效果
- [主题定制](/theming/config-provider) - 自定义颜色配置
