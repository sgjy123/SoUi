---
title: Mixins 样式工具
---

# Mixins 样式工具

SoUi 提供了一组常用的 Less Mixin，帮助开发者快速实现常见的样式模式，同时确保与设计系统的过渡动画、禁用状态等规范保持一致。

## 过渡动画 Mixin

SoUi 的过渡动画基于全局 CSS 变量链，支持在编译时和运行时两个层面进行控制。

### 全局过渡变量

| Less 变量 | CSS 变量 | 值 | 说明 |
|----------|----------|-----|------|
| `@transition-duration` | `--soui-transition-duration` | 0.3s | 过渡持续时间 |
| `@transition-timing-function` | `--soui-transition-timing-function` | ease-in-out | 过渡缓动函数 |

### .transition-all()

为所有属性添加过渡动画。适用于需要整体过渡效果的元素，如 Steps 组件的步骤项。

```less
// 定义（variables.less）
.transition-all() {
  transition: all @transition-duration @transition-timing-function;
}
```

使用方式：

```less
.step-item {
  .transition-all();
}
```

编译结果：

```css
.step-item {
  transition: all 0.3s ease-in-out;
}
```

::: tip CSS 变量链式写法
在组件样式中，推荐使用 CSS 变量链式写法以确保运行时可配置：
```less
.step-item {
  transition: all
    var(--soui-transition-duration, @transition-duration)
    var(--soui-transition-timing-function, @transition-timing-function);
}
```
这样用户可以通过 ConfigProvider 或 CSS 变量覆盖全局过渡参数。
:::

### .transition-color()

仅对颜色相关属性（`color`、`background-color`、`border-color`）添加过渡动画。适用于按钮、链接等交互元素，避免对不需要的属性触发过渡。

```less
// 定义（variables.less）
.transition-color() {
  transition: color @transition-duration @transition-timing-function,
              background-color @transition-duration @transition-timing-function,
              border-color @transition-duration @transition-timing-function;
}
```

使用方式：

```less
.link-text {
  .transition-color();
}
```

编译结果：

```css
.link-text {
  transition: color 0.3s ease-in-out,
              background-color 0.3s ease-in-out,
              border-color 0.3s ease-in-out;
}
```

CSS 变量链式写法：

```less
.link-text {
  transition:
    color var(--soui-transition-duration, @transition-duration) var(--soui-transition-timing-function, @transition-timing-function),
    background-color var(--soui-transition-duration, @transition-duration) var(--soui-transition-timing-function, @transition-timing-function),
    border-color var(--soui-transition-duration, @transition-duration) var(--soui-transition-timing-function, @transition-timing-function);
}
```

### 两种 Mixin 的选择

| 场景 | 推荐 Mixin | 理由 |
|------|-----------|------|
| 悬停改变多种属性（尺寸、阴影等） | `.transition-all()` | 覆盖所有属性变化 |
| 仅改变颜色（按钮悬停、链接高亮） | `.transition-color()` | 性能更好，避免不必要的过渡 |
| 需要精细控制 | 手写 `transition` | 指定具体属性和时长 |

## Clearfix 清除浮动

`.clearfix()` 用于清除子元素浮动导致的父元素高度塌陷问题。

```less
// 定义（global.less）
.clearfix() {
  &::before,
  &::after {
    content: '';
    display: table;
    clear: both;
  }
}
```

使用方式：

```less
.card-layout {
  .clearfix();

  .card-item {
    float: left;
    width: 33.33%;
  }
}
```

::: tip 现代布局建议
在支持的场景下，优先使用 Flexbox 或 Grid 布局代替浮动，可以完全避免清除浮动的需求：
```less
// 推荐：使用 Flexbox
.card-layout {
  display: flex;
  flex-wrap: wrap;
  gap: @margin-md;
}
```
:::

## 禁用状态 Mixin

`.disabled-mixin()` 为禁用状态的元素提供统一的视觉和交互表现。

```less
// 定义（global.less）
.disabled-mixin() {
  opacity: 0.6;
  cursor: not-allowed;
  pointer-events: none;
}
```

使用方式：

```less
.custom-button {
  &.is-disabled {
    .disabled-mixin();
  }
}
```

编译结果：

```css
.custom-button.is-disabled {
  opacity: 0.6;
  cursor: not-allowed;
  pointer-events: none;
}
```

## 文本截断

虽然 SoUi 未封装为 Mixin，但文本截断是项目中广泛使用的样式模式。以下是推荐的写法：

### 单行截断

```less
.card-title,
.menu-item-text,
.select-option {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

Card 组件中的实际应用：

```less
.soui-card-header-title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: var(--soui-card-header-font-size-component,
    var(--soui-card-header-font-size,
      var(--soui-font-size-lg, @font-size-lg)));
}
```

### 多行截断

```less
.card-description {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  text-overflow: ellipsis;
}
```

::: warning 兼容性注意
多行截断使用了 `-webkit-line-clamp` 属性，在现代浏览器中支持良好，但不属于 CSS 标准。如需兼容旧浏览器，请使用 JavaScript 方案。
:::

## 滚动条样式

SoUi 提供了统一的自定义滚动条样式类：

```less
// 定义（global.less）
.soui-scrollbar {
  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 3px;

    &:hover {
      background: rgba(0, 0, 0, 0.3);
    }
  }
}
```

使用方式：

```html
<div class="soui-scrollbar" style="max-height: 300px; overflow-y: auto;">
  <!-- 滚动内容 -->
</div>
```

## 焦点高亮样式

SoUi 提供了符合无障碍标准的焦点样式类：

```less
// 定义（global.less）
.soui-focus-highlight {
  &:focus-visible {
    outline: 2px solid var(--soui-primary-color, @primary-color);
    outline-offset: 2px;
  }
}
```

使用方式：

```html
<button class="soui-focus-highlight">可访问的按钮</button>
```

## CSS 变量链式写法模式

SoUi 组件广泛使用三层 CSS 变量回退链，这是一种核心的设计模式：

```less
// 三层回退链：组件级 -> 全局级 -> Less 编译时
.my-component {
  font-size: var(--soui-my-component-font-size,
    var(--soui-font-size, @font-size-base));

  color: var(--soui-my-component-color,
    var(--soui-text-color, @text-color));

  box-shadow: var(--soui-my-component-shadow,
    var(--soui-box-shadow-secondary, @box-shadow-secondary));

  transition: all
    var(--soui-transition-duration, @transition-duration)
    var(--soui-transition-timing-function, @transition-timing-function);
}
```

三层含义：

| 层级 | 变量示例 | 覆盖范围 | 配置方式 |
|------|---------|---------|---------|
| 第1层：组件级 | `--soui-my-component-font-size` | 仅该组件 | CSS 变量或 ConfigProvider |
| 第2层：全局级 | `--soui-font-size` | 所有引用此令牌的组件 | `:root` CSS 变量 |
| 第3层：编译时 | `@font-size-base` | 固定值 | Less 变量覆盖 |

## 使用方式总结

### 在 Less 文件中使用

```less
@import '~@soui/ui/src/styles/variables.less';
@import '~@soui/ui/src/styles/global.less';

.my-component {
  // 使用 Mixin
  .transition-all();
  .clearfix();

  // 使用 CSS 变量链式写法
  transition: box-shadow
    var(--soui-transition-duration, @transition-duration)
    var(--soui-transition-timing-function, @transition-timing-function);

  // 文本截断
  .title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  // 禁用状态
  &.disabled {
    .disabled-mixin();
  }
}
```

### 通过 CSS 变量全局覆盖

```css
:root {
  /* 修改全局过渡动画参数，所有组件自动更新 */
  --soui-transition-duration: 0.2s;
  --soui-transition-timing-function: ease;
}
```

### 通过 ConfigProvider 配置

```tsx
import { ConfigProvider } from '@soui/ui';

function App() {
  return (
    <ConfigProvider
      theme={{
        transitionDuration: '0.2s',
        transitionTimingFunction: 'ease',
      }}
    >
      <App />
    </ConfigProvider>
  );
}
```

## 最佳实践

### 推荐用法

```less
// 1. 优先使用 .transition-color() 处理颜色过渡
.button {
  .transition-color();
}

// 2. 使用 CSS 变量链式写法确保运行时可配置
.panel {
  transition: transform
    var(--soui-transition-duration, @transition-duration)
    var(--soui-transition-timing-function, @transition-timing-function);
}

// 3. 使用 .disabled-mixin() 保持禁用状态一致
.input {
  &.disabled {
    .disabled-mixin();
  }
}

// 4. 使用 .soui-scrollbar 统一滚动条外观
.scroll-container {
  &:extend(.soui-scrollbar);
}
```

### 避免使用

```less
// 1. 避免硬编码过渡参数
.element {
  transition: all 0.3s ease-in-out; // 不推荐：无法通过主题配置
}

// 2. 避免自定义禁用样式
.custom-disabled {
  opacity: 0.5;           // 不推荐：与系统规范不一致
  cursor: not-allowed;
}

// 3. 避免使用过快的过渡
.fast-transition {
  transition: all 0.05s;  // 不推荐：过渡时间过短，用户感知不到
}

// 4. 避免遗漏过渡导致跳变
.hover-card {
  box-shadow: @box-shadow;
  // 不推荐：悬停时没有过渡动画
  &:hover {
    box-shadow: @box-shadow-secondary;
  }
}
```

## 完整 Mixin 列表

| Mixin | 定义位置 | 用途 |
|-------|---------|------|
| `.transition-all()` | variables.less | 所有属性过渡动画 |
| `.transition-color()` | variables.less | 颜色属性过渡动画 |
| `.clearfix()` | global.less | 清除浮动 |
| `.disabled-mixin()` | global.less | 禁用状态统一样式 |
| `.soui-scrollbar` | global.less | 自定义滚动条样式（工具类） |
| `.soui-focus-highlight` | global.less | 焦点高亮样式（工具类） |

## 相关资源

- [色彩系统](/styles/colors) - 了解颜色变量
- [排版系统](/styles/typography) - 学习排版规范
- [阴影系统](/styles/shadows) - 了解阴影效果和动画
- [间距系统](/styles/spacing) - 了解间距规范
