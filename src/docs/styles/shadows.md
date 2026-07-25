---
title: 阴影系统
---

# 阴影系统

SoUi 的阴影系统通过不同层级的投影效果来表达元素之间的层级关系和空间深度，帮助用户理解界面结构。

## 阴影基础

阴影由两个颜色变量控制透明度，搭配不同的偏移和模糊半径形成层次：

| 变量 | Less 名称 | 值 | 用途 |
|------|----------|-----|------|
| 主阴影色 | `@shadow-color` | rgba(0, 0, 0, 0.1) | 标准投影效果 |
| 辅助阴影色 | `@shadow-color-secondary` | rgba(0, 0, 0, 0.06) | 轻量投影效果 |

## 阴影层级

SoUi 定义了三个标准阴影层级，从轻量到重量依次递增：

<ShadowTable
  :shadows="[
    { level: '三级阴影', less: '@box-shadow-tertiary', value: '0 1px 2px rgba(0,0,0,0.1)', usage: '最轻量的阴影，用于细微的层次区分' },
    { level: '基础阴影', less: '@box-shadow', value: '0 2px 8px rgba(0,0,0,0.1)', usage: '默认阴影，用于卡片、弹出菜单等常见浮层' },
    { level: '二级阴影', less: '@box-shadow-secondary', value: '0 6px 16px rgba(0,0,0,0.1)', usage: '较重的阴影，用于对话框、悬停状态等需要突出层级的场景' },
  ]"
/>

### 层级选择原则

- **三级阴影**：适合静态的、不需要强调层级的小元素
- **基础阴影**：适合大多数浮层组件，是默认选择
- **二级阴影**：适合需要强调层级、吸引注意力的高层级元素

## CSS 变量

阴影系统通过 CSS 变量暴露到全局，支持运行时动态调整：

```css
:root {
  --soui-box-shadow-secondary: 0 6px 16px rgba(0, 0, 0, 0.1);
}
```

各组件在此基础上定义自己的阴影变量，通过引用全局变量保持一致性：

| 组件 | CSS 变量 | 默认引用 |
|------|----------|---------|
| Tooltip | `--soui-tooltip-box-shadow` | `var(--soui-box-shadow-secondary)` |
| Dialog | `--soui-dialog-box-shadow` | `var(--soui-box-shadow-secondary)` |
| Drawer | `--soui-drawer-box-shadow` | 自定义多层阴影 |
| Card 悬停 | `--soui-card-hover-shadow` | `var(--soui-box-shadow-secondary)` |
| Calendar | 直接使用 | `var(--soui-box-shadow-secondary)` |

## 组件中的阴影模式

### Card 卡片

Card 组件默认无阴影，悬停时显示二级阴影，并配合过渡动画平滑过渡：

```less
.soui-card {
  transition: box-shadow
    var(--soui-transition-duration, @transition-duration)
    var(--soui-transition-timing-function, @transition-timing-function);

  &:hover {
    box-shadow: var(--soui-card-hover-shadow-component,
      var(--soui-card-hover-shadow,
        var(--soui-box-shadow-secondary, @box-shadow-secondary)));
  }
}
```

这种三层 `var()` 回退链是 SoUi 组件的标准模式，支持组件级、全局级和 Less 编译时的三级覆盖。

### Tooltip 提示

Tooltip 使用独立的阴影值，略轻于二级阴影，使提示框不会过于突出：

```less
@tooltip-box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

// 通过 CSS 变量引用
.soui-tooltip {
  box-shadow: var(--soui-tooltip-box-shadow, @tooltip-box-shadow);
}
```

### Dialog 对话框

Dialog 引用全局二级阴影，强调其作为高层级浮层的视觉地位：

```less
.soui-dialog {
  box-shadow: var(--soui-dialog-box-shadow,
    var(--soui-box-shadow-secondary, @box-shadow-secondary));
}
```

### Drawer 抽屉

Drawer 使用自定义的多层阴影，模拟从侧面滑入的光影效果：

```css
--soui-drawer-box-shadow:
  -6px 0 16px 0 rgba(0, 0, 0, 0.08),
  -3px 0 6px -4px rgba(0, 0, 0, 0.12),
  -9px 0 28px 8px rgba(0, 0, 0, 0.05);
```

多层阴影的组合让 Drawer 的边缘过渡更加自然柔和。

### Button 按钮

Button 使用极轻的底部阴影来增加立体感：

```less
.soui-btn-default {
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.02);
}

.soui-btn-primary {
  box-shadow: 0 2px 0 rgba(5, 145, 255, 0.1);
}
```

### Dropdown / AutoComplete 下拉面板

下拉面板使用多层阴影组合，模拟真实的光照效果：

```less
.soui-autocomplete-dropdown {
  box-shadow:
    0 6px 16px rgba(0, 0, 0, 0.08),
    0 3px 6px -4px rgba(0, 0, 0, 0.12),
    0 9px 28px 8px rgba(0, 0, 0, 0.05);
}
```

## 使用方式

### 1. Less 变量

```less
@import '~@soui/ui/src/styles/variables.less';

.my-card {
  box-shadow: @box-shadow;

  &:hover {
    box-shadow: @box-shadow-secondary;
  }
}

.my-tooltip {
  box-shadow: @box-shadow-tertiary;
}
```

### 2. CSS Variables

```css
/* 引用全局阴影变量 */
.my-panel {
  box-shadow: var(--soui-box-shadow-secondary);
}

/* 局部覆盖阴影 */
.my-section {
  --soui-box-shadow-secondary: 0 8px 24px rgba(0, 0, 0, 0.12);
}
```

```tsx
// 在 React 中使用内联样式
<div style={{
  boxShadow: 'var(--soui-box-shadow-secondary)',
} as React.CSSProperties}>
  使用 CSS 变量的阴影
</div>
```

### 3. ConfigProvider

```tsx
import { ConfigProvider, Card, Dialog } from '@soui/ui';

function App() {
  return (
    <ConfigProvider
      theme={{
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
        boxShadowSecondary: '0 8px 24px rgba(0, 0, 0, 0.12)',
      }}
    >
      <Card>统一配置的卡片阴影</Card>
      <Dialog>统一配置的对话框阴影</Dialog>
    </ConfigProvider>
  );
}
```

## 阴影动画

阴影的变化应配合过渡动画，避免生硬的跳变：

```less
.my-element {
  box-shadow: @box-shadow-tertiary;
  transition: box-shadow
    var(--soui-transition-duration, @transition-duration)
    var(--soui-transition-timing-function, @transition-timing-function);

  &:hover {
    box-shadow: @box-shadow-secondary;
  }
}
```

## 最佳实践

### 推荐用法

```less
// 1. 使用预定义的阴影变量
.card {
  box-shadow: @box-shadow;
}

// 2. 配合过渡动画使用
.interactive-card {
  box-shadow: @box-shadow-tertiary;
  transition: box-shadow @transition-duration @transition-timing-function;

  &:hover {
    box-shadow: @box-shadow-secondary;
  }
}

// 3. 通过 CSS 变量实现局部自定义
.special-section {
  --soui-card-hover-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}
```

### 避免使用

```less
// 1. 避免硬编码阴影值
.card {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); // 不推荐：应使用 @box-shadow
}

// 2. 避免过度使用阴影
.everything-has-shadow {
  box-shadow: @box-shadow-secondary; // 不推荐：所有元素都有阴影会失去层次感
}

// 3. 避免阴影没有过渡动画
.card {
  box-shadow: @box-shadow;

  &:hover {
    box-shadow: @box-shadow-secondary; // 不推荐：没有 transition，跳变生硬
  }
}

// 4. 避免使用过重的阴影
.heavy-shadow {
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5); // 不推荐：超出设计系统范围
}
```

## 完整变量列表

| 用途 | Less 变量 | 值 |
|------|----------|-----|
| 主阴影色 | `@shadow-color` | rgba(0, 0, 0, 0.1) |
| 辅助阴影色 | `@shadow-color-secondary` | rgba(0, 0, 0, 0.06) |
| 基础阴影 | `@box-shadow` | 0 2px 8px rgba(0, 0, 0, 0.1) |
| 二级阴影 | `@box-shadow-secondary` | 0 6px 16px rgba(0, 0, 0, 0.1) |
| 三级阴影 | `@box-shadow-tertiary` | 0 1px 2px rgba(0, 0, 0, 0.1) |
| Tooltip 阴影 | `@tooltip-box-shadow` | 0 4px 12px rgba(0, 0, 0, 0.15) |
| 全局阴影 CSS 变量 | `--soui-box-shadow-secondary` | 0 6px 16px rgba(0, 0, 0, 0.1) |

## 相关资源

- [色彩系统](/styles/colors) - 了解颜色体系
- [排版系统](/styles/typography) - 学习文字排版规范
- [Mixins](/styles/mixins) - 使用过渡动画等样式工具
- [间距系统](/styles/spacing) - 了解间距规范
