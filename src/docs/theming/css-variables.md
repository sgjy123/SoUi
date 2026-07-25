---
title: CSS 变量
---

# CSS 变量

SoUi 采用 CSS 自定义属性（CSS Variables）作为主题系统的核心机制。`ConfigProvider` 组件会自动将所有主题配置转化为 CSS 变量，注入到 DOM 中，使组件样式可以在运行时动态修改，无需重新编译。

## 工作原理

当你在应用顶层包裹 `ConfigProvider` 时，它会将 `theme` 配置合并默认值后，生成一组以 `--soui-` 为前缀的 CSS 自定义属性，并通过内联 `style` 应用到包裹容器上：

```tsx
<ConfigProvider theme={{ primaryColor: '#722ed1' }}>
  <App />
</ConfigProvider>
```

渲染后生成的 DOM 结构如下：

```html
<div class="soui-config-provider"
     style="--soui-primary-color: #722ed1; --soui-border-radius: 6px; ..."
     data-soui-theme="custom">
  <!-- 子组件 -->
</div>
```

所有被 `ConfigProvider` 包裹的子组件都能通过 `var(--soui-xxx)` 读取这些变量，实现样式的统一控制。

## 三层设计令牌体系

SoUi 的 CSS 变量遵循**三层分层架构**，从全局到局部逐级细化，提供灵活的主题定制能力。

### 第 1 层：设计令牌（Design Tokens）

设计令牌是最底层的全局变量，**不带组件前缀**，代表整个设计系统的基础语义值。它们被多个组件共享引用。

```css
/* 颜色令牌 */
--soui-primary-color: #1677ff;
--soui-primary-hover-color: #4096ff;
--soui-primary-active-color: #0958d9;
--soui-success-color: #52c41a;
--soui-warning-color: #faad14;
--soui-error-color: #ff4d4f;
--soui-info-color: #1677ff;

/* 文本令牌 */
--soui-color-text-inverse: #fff;

/* 背景令牌 */
--soui-color-bg-default: rgba(0, 0, 0, 0.88);

/* 排版令牌 */
--soui-font-size: 14px;
--soui-font-size-sm: 12px;
--soui-line-height: 1.5715;
--soui-line-height-sm: 1.6667;

/* 形状令牌 */
--soui-border-radius: 6px;

/* 间距令牌 */
--soui-size-small: 8px;
--soui-size-middle: 16px;
--soui-size-large: 24px;

/* 层级与动效令牌 */
--soui-z-index-popover: 1030;
--soui-transition-duration: 0.2s;
--soui-box-shadow-secondary: 0 3px 6px -4px rgba(0,0,0,0.12), ...;
```

设计令牌通过 `ThemeConfig` 的顶层属性配置：

```tsx
<ConfigProvider
  theme={{
    primaryColor: '#722ed1',     // → --soui-primary-color
    borderRadius: 8,             // → --soui-border-radius
    fontSize: 16,                // → --soui-font-size
    paddingSM: 12,               // → --soui-size-small
  }}
>
```

### 第 2 层：组件配置点（Component Configuration Points）

组件配置点带有**组件名称前缀**（如 `tooltip`、`input`、`menu`），是设计令牌在具体组件上的映射。它们通常引用第 1 层的设计令牌作为默认值。

```css
/* Tooltip 配置点 */
--soui-tooltip-bg-color: rgba(0, 0, 0, 0.88);    /* 引用 --soui-color-bg-default */
--soui-tooltip-text-color: #fff;                   /* 引用 --soui-color-text-inverse */
--soui-tooltip-font-size: 12px;                    /* 引用 --soui-font-size-sm */
--soui-tooltip-border-radius: 6px;
--soui-tooltip-padding: 6px 12px;
--soui-tooltip-z-index: 1030;

/* Input 配置点 */
--soui-input-color-border: #d9d9d9;
--soui-input-color-border-hover: #4096ff;
--soui-input-color-border-focus: #1677ff;
--soui-input-color-bg: #fff;
--soui-input-color-text: rgba(0, 0, 0, 0.88);
--soui-input-control-height-middle: 32px;
--soui-input-border-radius: 6px;

/* Menu 配置点 */
--soui-menu-color-primary: #1677ff;
--soui-menu-item-hover-bg: rgba(0, 0, 0, 0.04);
--soui-menu-item-selected-bg: rgba(24, 144, 255, 0.1);
--soui-menu-item-selected-color: #1677ff;
```

组件配置点通过全局 Tooltip 配置或 `components` 属性设置：

```tsx
<ConfigProvider
  theme={{
    // 全局 Tooltip 配置 → 映射到 --soui-tooltip-* 变量
    tooltipBgColor: '#1f1f1f',
    tooltipBorderRadius: 8,

    components: {
      // Input 组件配置 → 映射到 --soui-input-* 变量
      Input: {
        colorBorder: '#d9d9d9',
        borderRadius: 4,
        controlHeight: 36,
      },
      // Menu 组件配置 → 映射到 --soui-menu-* 变量
      Menu: {
        colorPrimary: '#722ed1',
        itemSelectedBg: 'rgba(114, 46, 209, 0.1)',
      },
    },
  }}
>
```

### 第 3 层：组件级覆盖（Component-level Overrides）

组件级覆盖带有 **`-component` 后缀**，是优先级最高的变量层。只有当你在 `components` 中显式设置了某个属性时，才会生成对应的 `-component` 变量，用于覆盖第 2 层的配置点。

```css
/* Tooltip 组件级覆盖 */
--soui-tooltip-color-bg-default-component: #1f1f1f;
--soui-tooltip-color-text-component: #fff;
--soui-tooltip-border-radius-component: 8px;

/* Menu 组件级覆盖 */
--soui-menu-color-primary-component: #722ed1;
--soui-menu-item-selected-bg-component: rgba(114, 46, 209, 0.1);

/* ColorPicker 组件级覆盖 */
--soui-color-picker-color-primary-component: #722ed1;
--soui-color-picker-border-radius-component: 8px;
```

组件级覆盖仅在该组件的配置项被显式设置时才会生成。当值为 `undefined` 时，CSS 变量不会被设置，从而回退到第 2 层的配置点。

## CSS 变量链式回退模式

组件的 Less 样式文件中使用 `var()` 函数的嵌套回退机制，将三层变量串联起来：

```less
.soui-tooltip {
  background-color: var(
    --soui-tooltip-color-bg-default-component,     /* 第3层: 组件级覆盖 */
    var(
      --soui-tooltip-bg-color,                      /* 第2层: 组件配置点 */
      @tooltip-bg-color                             /* Less 变量兜底 */
    )
  );

  border-radius: var(
    --soui-tooltip-border-radius-component,         /* 第3层 */
    var(
      --soui-tooltip-border-radius,                 /* 第2层 */
      @tooltip-border-radius                        /* Less 兜底 */
    )
  );
}
```

这个回退链的含义是：
1. 优先使用第 3 层组件级覆盖变量
2. 若不存在，回退到第 2 层组件配置点
3. 若配置点也未设置，最终使用 Less 编译时的默认值

## 优先级顺序

SoUi 主题系统的完整优先级从高到低如下：

| 优先级 | 来源 | 说明 |
|--------|------|------|
| 最高 | 组件 Props | 组件自身传入的 `style`、`className` 等属性 |
| 高 | 第 3 层：组件级覆盖 | `components.Xxx` 中的显式配置生成的 `-component` 变量 |
| 中 | 第 2 层：组件配置点 | 组件专属的 CSS 变量（含默认值回退） |
| 低 | 第 1 层：设计令牌 | 全局 CSS 变量，被组件配置点引用 |
| 最低 | Less 变量 | 编译时确定的默认值，作为最终兜底 |

这意味着如果你想修改某个组件的外观，应优先通过 `ConfigProvider` 的 `components` 配置来实现，而不是直接覆盖 CSS。

## 在自定义样式中使用 CSS 变量

### 在 CSS/Less 中使用

你可以在自己的样式文件中直接引用 SoUi 的 CSS 变量，确保自定义样式与组件库风格一致：

```css
.my-card {
  background-color: var(--soui-input-color-bg, #fff);
  border: 1px solid var(--soui-input-color-border, #d9d9d9);
  border-radius: var(--soui-border-radius, 6px);
  padding: var(--soui-size-middle, 16px);
  color: var(--soui-typography-color-text, rgba(0, 0, 0, 0.88));
  font-size: var(--soui-font-size, 14px);
}

.my-card:hover {
  border-color: var(--soui-primary-hover-color, #4096ff);
}
```

### 在内联样式中使用

```tsx
function StatusBadge({ type }) {
  const colorMap = {
    success: 'var(--soui-success-color)',
    warning: 'var(--soui-warning-color)',
    error: 'var(--soui-error-color)',
    info: 'var(--soui-info-color)',
  };

  return (
    <span style={{
      display: 'inline-block',
      width: 8,
      height: 8,
      borderRadius: '50%',
      backgroundColor: colorMap[type],
    }} />
  );
}
```

### 使用 Hook 获取主题值

当你需要在 JavaScript 中读取主题配置（例如用于图表颜色）时，可以使用 `useTheme` Hook：

```tsx
import { useTheme } from '@soui/ui';

function MyChart() {
  const theme = useTheme();

  const chartColors = {
    primary: theme.primaryColor || '#1677ff',
    success: theme.successColor || '#52c41a',
    error: theme.errorColor || '#ff4d4f',
  };

  // 将主题色传递给图表库
  return <Chart colors={chartColors} />;
}
```

## 常用 CSS 变量参考

### 全局基础变量

| CSS 变量 | 默认值 | 说明 |
|----------|--------|------|
| `--soui-primary-color` | `#1677ff` | 主题色 |
| `--soui-primary-hover-color` | `#4096ff` | 主题色悬停 |
| `--soui-primary-active-color` | `#0958d9` | 主题色激活 |
| `--soui-success-color` | `#52c41a` | 成功色 |
| `--soui-warning-color` | `#faad14` | 警告色 |
| `--soui-error-color` | `#ff4d4f` | 错误色 |
| `--soui-info-color` | `#1677ff` | 信息色 |
| `--soui-border-radius` | `6px` | 基础圆角 |
| `--soui-font-size` | `14px` | 基础字号 |
| `--soui-line-height` | `1.5715` | 基础行高 |
| `--soui-size-small` | `8px` | 小间距 |
| `--soui-size-middle` | `16px` | 中间距 |
| `--soui-size-large` | `24px` | 大间距 |

### 排版变量

| CSS 变量 | 默认值 | 说明 |
|----------|--------|------|
| `--soui-typography-color-text` | `rgba(0,0,0,0.88)` | 主要文本色 |
| `--soui-typography-color-text-secondary` | `rgba(0,0,0,0.65)` | 次要文本色 |
| `--soui-typography-color-text-disabled` | `rgba(0,0,0,0.25)` | 禁用文本色 |
| `--soui-typography-color-link` | `#1677ff` | 链接颜色 |
| `--soui-typography-color-success` | `#52c41a` | 成功状态色 |
| `--soui-typography-color-warning` | `#faad14` | 警告状态色 |
| `--soui-typography-color-danger` | `#ff4d4f` | 危险状态色 |
| `--soui-typography-font-size-sm` | `12px` | 小字号 |
| `--soui-typography-font-size-base` | `14px` | 基础字号 |
| `--soui-typography-font-size-lg` | `16px` | 大字号 |
| `--soui-typography-font-size-xl` | `20px` | 超大字号 |
| `--soui-typography-heading-font-weight` | `600` | 标题字重 |
| `--soui-typography-mark-bg-color` | `#ffe58f` | 标记背景色 |

### 表单类组件变量

| CSS 变量 | 默认值 | 说明 |
|----------|--------|------|
| `--soui-input-color-bg` | `#fff` | 输入框背景色 |
| `--soui-input-color-text` | `rgba(0,0,0,0.88)` | 输入框文本色 |
| `--soui-input-color-border` | `#d9d9d9` | 输入框边框色 |
| `--soui-input-color-border-hover` | `#4096ff` | 输入框悬停边框色 |
| `--soui-input-color-border-focus` | `#1677ff` | 输入框聚焦边框色 |
| `--soui-input-color-bg-disabled` | `#f5f5f5` | 输入框禁用背景色 |
| `--soui-input-control-height-middle` | `32px` | 输入框默认高度 |
| `--soui-input-border-radius` | `6px` | 输入框圆角 |
| `--soui-select-dropdown-bg` | `#fff` | 选择器下拉面板背景 |
| `--soui-select-option-active-bg` | `rgba(0,0,0,0.04)` | 选择器选项悬停背景 |
| `--soui-select-option-selected-bg` | `rgba(22,119,255,0.08)` | 选择器选项选中背景 |

### 反馈类组件变量

| CSS 变量 | 默认值 | 说明 |
|----------|--------|------|
| `--soui-tooltip-bg-color` | `rgba(0,0,0,0.88)` | Tooltip 背景色 |
| `--soui-tooltip-text-color` | `#fff` | Tooltip 文本色 |
| `--soui-tooltip-border-radius` | `6px` | Tooltip 圆角 |
| `--soui-tooltip-max-width` | `250px` | Tooltip 最大宽度 |
| `--soui-dialog-bg-color` | `#fff` | 对话框背景色 |
| `--soui-dialog-mask-bg-color` | `rgba(0,0,0,0.45)` | 对话框遮罩色 |
| `--soui-dialog-border-radius` | `8px` | 对话框圆角 |
| `--soui-drawer-bg-color` | `#fff` | 抽屉背景色 |
| `--soui-drawer-mask-bg-color` | `rgba(0,0,0,0.45)` | 抽屉遮罩色 |
| `--soui-loading-color-primary` | `#1677ff` | 加载图标颜色 |
| `--soui-progress-color-primary` | `#1677ff` | 进度条主色 |
| `--soui-progress-trail-color` | - | 进度条轨道色 |

### 数据展示类组件变量

| CSS 变量 | 默认值 | 说明 |
|----------|--------|------|
| `--soui-table-header-bg` | - | 表头背景色 |
| `--soui-table-row-hover-bg` | - | 行悬停背景色 |
| `--soui-table-border-color` | - | 表格边框色 |
| `--soui-table-stripe-bg` | - | 斑马纹背景色 |
| `--soui-card-color-bg` | - | 卡片背景色 |
| `--soui-card-border-color` | - | 卡片边框色 |
| `--soui-card-border-radius` | `6px` | 卡片圆角 |
| `--soui-tag-default-bg` | - | 标签默认背景色 |
| `--soui-badge-color-error` | `#ff4d4f` | 徽章错误色 |

### 导航类组件变量

| CSS 变量 | 默认值 | 说明 |
|----------|--------|------|
| `--soui-menu-color-text` | `rgba(0,0,0,0.88)` | 菜单文本色 |
| `--soui-menu-color-primary` | `#1677ff` | 菜单主色 |
| `--soui-menu-item-hover-bg` | `rgba(0,0,0,0.04)` | 菜单项悬停背景 |
| `--soui-menu-item-selected-bg` | `rgba(24,144,255,0.1)` | 菜单项选中背景 |
| `--soui-menu-item-selected-color` | `#1677ff` | 菜单项选中文本色 |
| `--soui-tabs-color-primary` | `#1677ff` | 标签页主色 |
| `--soui-breadcrumb-color-text` | - | 面包屑文本色 |
| `--soui-pagination-color-primary` | `#1677ff` | 分页器主色 |
| `--soui-pagination-border-color` | `#d9d9d9` | 分页器边框色 |

## 浏览器兼容性

CSS 自定义属性在以下浏览器中得到支持：

- Chrome 49+
- Firefox 31+
- Safari 9.1+
- Edge 15+

SoUi 的 CSS 变量方案不支持 IE 浏览器。如需兼容 IE，请使用 Less 变量方案进行编译时定制。

## 相关文档

- [ConfigProvider 全局配置](/theming/config-provider) - 了解主题配置的完整 API
- [暗黑模式](/theming/dark-mode) - 基于 CSS 变量实现暗色主题
- [色彩系统](/styles/colors) - 了解 SoUi 的颜色规范
