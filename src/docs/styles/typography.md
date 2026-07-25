---
title: 排版系统
---

# 排版系统

SoUi 的排版系统基于系统字体栈，提供了一套完整的字号、行高和文本颜色规范，确保应用中的文字清晰可读、层次分明。

## 字体家族

SoUi 使用系统原生字体栈，无需额外加载网络字体，保证最佳渲染性能和原生体验：

```less
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
  'Helvetica Neue', Arial, 'Noto Sans', sans-serif,
  'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
```

各平台字体映射：

| 平台 | 主要字体 | 说明 |
|------|---------|------|
| macOS / iOS | -apple-system, BlinkMacSystemFont | San Francisco |
| Windows | Segoe UI | 微软系统字体 |
| Android | Roboto | Google 系统字体 |
| Linux | Noto Sans, Helvetica Neue | 通用无衬线字体 |

## 字号体系

### 基础字号

SoUi 提供四个层级的字号变量，覆盖从辅助文字到大标题的所有场景。

<FontSizeTable
  :sizes="[
    { name: '小字号', less: '@font-size-sm', css: '--soui-font-size-sm', value: '12px', usage: '辅助文字、标签、徽章' },
    { name: '基础字号', less: '@font-size-base', css: '--soui-font-size', value: '14px', usage: '正文、表单、按钮等默认文字' },
    { name: '大字号', less: '@font-size-lg', css: '--soui-font-size-lg', value: '16px', usage: '卡片标题、次要标题' },
    { name: '超大字号', less: '@font-size-xl', css: '--soui-font-size-xl', value: '20px', usage: '页面标题、重要数据展示' },
  ]"
/>

### 标题字号

标题系统提供 5 个层级，用于构建清晰的内容层次结构。

<HeadingTable
  :headings="[
    { level: 'H1', less: '@heading-1-font-size', css: '--soui-typography-heading-1-font-size', value: '50px', lineHeight: '1.23' },
    { level: 'H2', less: '@heading-2-font-size', css: '--soui-typography-heading-2-font-size', value: '40px', lineHeight: '1.25' },
    { level: 'H3', less: '@heading-3-font-size', css: '--soui-typography-heading-3-font-size', value: '30px', lineHeight: '1.3' },
    { level: 'H4', less: '@heading-4-font-size', css: '--soui-typography-heading-4-font-size', value: '25px', lineHeight: '1.35' },
    { level: 'H5', less: '@heading-5-font-size', css: '--soui-typography-heading-5-font-size', value: '20px', lineHeight: '1.4' },
  ]"
/>

标题字号均基于 `@font-size-xl`（20px）通过倍率计算得出，保证了视觉上的和谐递进关系。

### 响应式标题

在中等屏幕（`@screen-md: 768px`）及以下，部分标题会自动缩小以适应较小的视口：

| 层级 | 默认字号 | 中等屏幕字号 | CSS 变量 |
|------|---------|-------------|----------|
| H1 | 50px | 40px | `--soui-typography-heading-1-font-size-md` |
| H2 | 40px | 35px | `--soui-typography-heading-2-font-size-md` |
| H3 | 30px | 25px | `--soui-typography-heading-3-font-size-md` |

H4 和 H5 在响应式下保持不变。

## 行高

行高决定了文本的垂直密度和可读性。SoUi 提供三种行高：

| 名称 | Less 变量 | CSS 变量 | 值 | 使用场景 |
|------|----------|----------|-----|---------|
| 基础行高 | `@line-height-base` | `--soui-line-height` | 1.5715 | 正文、默认文本 |
| 紧凑行高 | `@line-height-sm` | `--soui-line-height-sm` | 1.6667 | 辅助文本、紧凑布局 |
| 宽松行高 | `@line-height-lg` | `--soui-line-height-lg` | 1.5 | 大号文本、标题 |

::: tip 行高与字号的关系
行高值是无单位的倍数。例如 `line-height: 1.5715` 配合 `font-size: 14px` 时，实际行高为 `14px * 1.5715 = 22px`。使用无单位行高可以确保字号变化时行高自动适配。
:::

## 文本颜色层次

文本颜色遵循语义化设计，通过透明度梯度实现层次区分：

<ColorGroup
  title="文本颜色"
  :colors="[
    { name: '主要文字', value: 'rgba(0, 0, 0, 0.88)', variable: '@text-color', css: '--soui-text-color', desc: '标题、正文等主要文本' },
    { name: '次要文字', value: 'rgba(0, 0, 0, 0.65)', variable: '@text-color-secondary', css: '--soui-text-color-secondary', desc: '描述信息、辅助文本' },
    { name: '禁用文字', value: 'rgba(0, 0, 0, 0.25)', variable: '@text-color-disabled', css: '--soui-text-color-disabled', desc: '禁用状态的文本' },
    { name: '反色文字', value: '#ffffff', variable: '@text-color-inverse', css: '--soui-color-text-inverse', desc: '深色背景上的白色文本' },
  ]"
/>

## Typography 特殊样式

SoUi 为排版组件提供了一些特殊样式变量：

| 用途 | Less 变量 | CSS 变量 | 值 |
|------|----------|----------|-----|
| 标记背景色 | `@typography-mark-bg-color` | `--soui-typography-mark-bg-color` | #ffe58f |
| 代码背景色 | `@typography-code-bg-color` | `--soui-typography-code-bg-color` | rgba(0, 0, 0, 0.04) |
| 代码边框色 | `@typography-code-border-color` | `--soui-typography-code-border-color` | rgba(0, 0, 0, 0.06) |

## 使用方式

### 1. Less 变量

在 Less 样式文件中直接使用预定义的排版变量：

```less
@import '~@soui/ui/src/styles/variables.less';

.article-title {
  font-size: @heading-2-font-size;
  line-height: @heading-2-line-height;
  color: @text-color;
}

.article-body {
  font-size: @font-size-base;
  line-height: @line-height-base;
  color: @text-color;
}

.article-meta {
  font-size: @font-size-sm;
  color: @text-color-secondary;
}

.disabled-text {
  color: @text-color-disabled;
  cursor: not-allowed;
}
```

### 2. CSS Variables

通过 CSS 自定义属性实现运行时动态调整，支持三层覆盖：

```css
/* 第1层：修改全局设计令牌，所有引用处自动更新 */
:root {
  --soui-font-size: 16px;
  --soui-line-height: 1.6;
  --soui-text-color: rgba(0, 0, 0, 0.88);
}

/* 第2层：仅修改 Typography 组件的字号，不影响其他组件 */
:root {
  --soui-typography-font-size-base: 15px;
  --soui-typography-heading-1-font-size: 48px;
}

/* 第3层：局部覆盖，仅影响当前容器 */
.my-section {
  --soui-typography-heading-2-font-size: 36px;
}
```

```tsx
// 在 React 中使用内联 CSS 变量
<div style={{
  '--soui-typography-heading-1-font-size': '48px',
  '--soui-font-size': '16px',
} as React.CSSProperties}>
  <Typography.Title level={1}>自定义标题字号</Typography.Title>
  <Typography.Text>自定义正文字号</Typography.Text>
</div>
```

### 3. ConfigProvider

通过 ConfigProvider 在应用顶层统一配置排版参数：

```tsx
import { ConfigProvider, Typography } from '@soui/ui';

function App() {
  return (
    <ConfigProvider
      theme={{
        typography: {
          heading1FontSize: '48px',
          heading2FontSize: '36px',
          fontSizeBase: '15px',
          lineHeightBase: 1.6,
        },
      }}
    >
      <Typography.Title level={1}>页面标题</Typography.Title>
      <Typography.Paragraph>
        正文内容，使用 ConfigProvider 统一配置的字号和行高。
      </Typography.Paragraph>
    </ConfigProvider>
  );
}
```

## 常用排版模式

### 文章排版

```less
.article {
  h1 {
    font-size: @heading-1-font-size;
    line-height: @heading-1-line-height;
    color: @text-color;
    margin-bottom: @margin-lg;
  }

  h2 {
    font-size: @heading-2-font-size;
    line-height: @heading-2-line-height;
    color: @text-color;
    margin-bottom: @margin-md;
  }

  p {
    font-size: @font-size-base;
    line-height: @line-height-base;
    color: @text-color;
    margin-bottom: @margin-md;
  }

  .caption {
    font-size: @font-size-sm;
    line-height: @line-height-sm;
    color: @text-color-secondary;
  }
}
```

### 数据展示

```less
.stat-card {
  .stat-value {
    font-size: @font-size-xl;
    line-height: @line-height-lg;
    color: @text-color;
    font-weight: 600;
  }

  .stat-label {
    font-size: @font-size-sm;
    color: @text-color-secondary;
    margin-top: @margin-xs;
  }

  .stat-trend {
    font-size: @font-size-sm;
    color: @success-color;
  }
}
```

### 表单标签

```less
.form-label {
  font-size: @font-size-base;
  line-height: @line-height-base;
  color: @text-color;

  &.required::after {
    content: '*';
    color: @error-color;
    margin-left: @margin-xs;
  }
}

.form-hint {
  font-size: @font-size-sm;
  line-height: @line-height-sm;
  color: @text-color-secondary;
  margin-top: @margin-xs;
}
```

## 最佳实践

### 推荐用法

```less
// 1. 使用语义化的字号变量而非硬编码
.title {
  font-size: @heading-3-font-size;  // 正确：使用标题变量
  line-height: @heading-3-line-height;
}

// 2. 保持颜色层次一致性
.subtitle {
  color: @text-color-secondary;     // 正确：次要文字用次要颜色
}

// 3. 字号与行高配套使用
.body-text {
  font-size: @font-size-base;
  line-height: @line-height-base;   // 正确：字号和行高配对
}

// 4. 利用 CSS 变量实现局部主题
.dark-section {
  --soui-text-color: #ffffff;
  --soui-text-color-secondary: rgba(255, 255, 255, 0.65);
}
```

### 避免使用

```less
// 1. 避免硬编码字号
.title {
  font-size: 30px;          // 不推荐：应使用 @heading-3-font-size
}

// 2. 避免使用不在系统中的字号
.custom-text {
  font-size: 13px;          // 不推荐：不在设计系统的字号规范中
}

// 3. 避免硬编码颜色值
.description {
  color: rgba(0, 0, 0, 0.65); // 不推荐：应使用 @text-color-secondary
}

// 4. 避免混用字号和行高
.mixed {
  font-size: @font-size-sm;      // 12px
  line-height: @line-height-lg;  // 为 16px+ 设计的行高，不匹配
}

// 5. 避免在有 CSS 变量可用时直接使用 Less 变量
.hardcoded {
  font-size: 14px;  // 不推荐：无法通过主题配置动态调整
}
```

## 完整变量列表

| 用途 | Less 变量 | CSS 变量 | 值 |
|------|----------|----------|-----|
| 基础字号 | `@font-size-base` | `--soui-font-size` | 14px |
| 小字号 | `@font-size-sm` | `--soui-font-size-sm` | 12px |
| 大字号 | `@font-size-lg` | `--soui-font-size-lg` | 16px |
| 超大字号 | `@font-size-xl` | `--soui-font-size-xl` | 20px |
| 基础行高 | `@line-height-base` | `--soui-line-height` | 1.5715 |
| 紧凑行高 | `@line-height-sm` | `--soui-line-height-sm` | 1.6667 |
| 宽松行高 | `@line-height-lg` | `--soui-line-height-lg` | 1.5 |
| H1 字号 | `@heading-1-font-size` | `--soui-typography-heading-1-font-size` | 50px |
| H2 字号 | `@heading-2-font-size` | `--soui-typography-heading-2-font-size` | 40px |
| H3 字号 | `@heading-3-font-size` | `--soui-typography-heading-3-font-size` | 30px |
| H4 字号 | `@heading-4-font-size` | `--soui-typography-heading-4-font-size` | 25px |
| H5 字号 | `@heading-5-font-size` | `--soui-typography-heading-5-font-size` | 20px |
| H1 行高 | `@heading-1-line-height` | `--soui-typography-heading-1-line-height` | 1.23 |
| H2 行高 | `@heading-2-line-height` | `--soui-typography-heading-2-line-height` | 1.25 |
| H3 行高 | `@heading-3-line-height` | `--soui-typography-heading-3-line-height` | 1.3 |
| H4 行高 | `@heading-4-line-height` | `--soui-typography-heading-4-line-height` | 1.35 |
| H5 行高 | `@heading-5-line-height` | `--soui-typography-heading-5-line-height` | 1.4 |
| 主要文字色 | `@text-color` | `--soui-text-color` | rgba(0,0,0,0.88) |
| 次要文字色 | `@text-color-secondary` | `--soui-text-color-secondary` | rgba(0,0,0,0.65) |
| 禁用文字色 | `@text-color-disabled` | `--soui-text-color-disabled` | rgba(0,0,0,0.25) |
| 反色文字色 | `@text-color-inverse` | `--soui-color-text-inverse` | #ffffff |
| 标记背景色 | `@typography-mark-bg-color` | `--soui-typography-mark-bg-color` | #ffe58f |
| 代码背景色 | `@typography-code-bg-color` | `--soui-typography-code-bg-color` | rgba(0,0,0,0.04) |

## 相关资源

- [色彩系统](/styles/colors) - 了解颜色的使用和配置
- [间距系统](/styles/spacing) - 学习间距规范和使用
- [Mixins](/styles/mixins) - 使用样式混入工具
- [阴影系统](/styles/shadows) - 了解阴影效果
