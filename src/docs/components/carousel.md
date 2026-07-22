# Carousel 轮播

一组轮播的区域，用于循环播放图片或内容。

## 何时使用

- 需要轮播展示一组图片或卡片时
- 需要在有限空间内循环展示多条内容时
- 作为页面焦点区域的 Banner 展示时

## 代码演示

### 基础用法

`autoplay` 开启自动播放，默认显示底部指示点。

```tsx
import { Carousel } from '@soui/ui';

export default () => (
  <Carousel autoplay>
    <div><h3 style={slideStyle}>1</h3></div>
    <div><h3 style={slideStyle}>2</h3></div>
    <div><h3 style={slideStyle}>3</h3></div>
  </Carousel>
);
```

### 指示点位置

`dotPosition` 设置指示点位置，可选 `top`、`bottom`、`left`、`right`。

```tsx
import { Carousel } from '@soui/ui';

export default () => (
  <Carousel dotPosition="left">
    <div><h3 style={slideStyle}>1</h3></div>
    <div><h3 style={slideStyle}>2</h3></div>
    <div><h3 style={slideStyle}>3</h3></div>
  </Carousel>
);
```

### 渐显

`effect="fade"` 使用渐显切换效果。

```tsx
import { Carousel } from '@soui/ui';

export default () => (
  <Carousel effect="fade" autoplay>
    <div><h3 style={slideStyle}>1</h3></div>
    <div><h3 style={slideStyle}>2</h3></div>
    <div><h3 style={slideStyle}>3</h3></div>
  </Carousel>
);
```

### 垂直方向

`vertical` 开启垂直方向轮播。

```tsx
import { Carousel } from '@soui/ui';

export default () => (
  <Carousel vertical autoplay style={{ width: 300 }}>
    <div><h3 style={slideStyle}>1</h3></div>
    <div><h3 style={slideStyle}>2</h3></div>
    <div><h3 style={slideStyle}>3</h3></div>
  </Carousel>
);
```

### 切换箭头

`arrows` 显示上一张/下一张切换箭头，`infinite={false}` 关闭无限循环。

```tsx
import { Carousel } from '@soui/ui';

export default () => (
  <Carousel arrows infinite={false}>
    <div><h3 style={slideStyle}>1</h3></div>
    <div><h3 style={slideStyle}>2</h3></div>
    <div><h3 style={slideStyle}>3</h3></div>
  </Carousel>
);
```

### 主题定制

通过 ConfigProvider 自定义轮播主题。

```tsx
import { Carousel, ConfigProvider } from '@soui/ui';

export default () => (
  <ConfigProvider
    theme={{
      components: {
        Carousel: {
          colorPrimary: '#722ed1',
          dotSize: 6,
          arrowSize: 40,
        },
      },
    }}
  >
    <Carousel arrows autoplay>
      <div><h3 style={slideStyle}>1</h3></div>
      <div><h3 style={slideStyle}>2</h3></div>
      <div><h3 style={slideStyle}>3</h3></div>
    </Carousel>
  </ConfigProvider>
);
```

## API

### Carousel 属性

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| autoplay | 是否自动切换 | `boolean` | `false` |
| autoplaySpeed | 自动切换间隔（毫秒） | `number` | `3000` |
| dots | 是否显示指示点 | `boolean` | `true` |
| dotPosition | 指示点位置 | `'top' \| 'bottom' \| 'left' \| 'right'` | `'bottom'` |
| effect | 切换动画效果 | `'scrollx' \| 'fade'` | `'scrollx'` |
| vertical | 是否垂直方向 | `boolean` | `false` |
| infinite | 是否无限循环 | `boolean` | `true` |
| speed | 切换动画时长（毫秒） | `number` | `500` |
| arrows | 是否显示切换箭头 | `boolean` | `false` |
| easing | 缓动函数 | `string` | `cubic-bezier(...)` |
| initialSlide | 初始展示的幻灯片索引 | `number` | `0` |
| afterChange | 切换动画结束后回调 | `(current: number) => void` | - |
| beforeChange | 切换动画开始前回调 | `(current: number, next: number) => void` | - |

### Carousel 方法

通过 `ref` 获取实例调用：

| 方法名 | 说明 | 类型 |
|--------|------|------|
| goTo | 切换到指定索引 | `(slide: number, dontAnimate?: boolean) => void` |
| next | 切换到下一张 | `() => void` |
| prev | 切换到上一张 | `() => void` |

```tsx
import { useRef } from 'react';
import { Carousel } from '@soui/ui';
import type { CarouselRef } from '@soui/ui';

export default () => {
  const ref = useRef<CarouselRef>(null);
  return (
    <>
      <Carousel ref={ref}>...</Carousel>
      <button onClick={() => ref.current?.next()}>下一张</button>
    </>
  );
};
```

## 主题定制

Carousel 作为标准 React 组件渲染在 ConfigProvider 的 DOM 树内，通过 CSS 变量继承自动获取主题配置，无需额外桥接。

### 组件级配置

通过 `theme.components.Carousel` 进行精细化配置：

```tsx
<ConfigProvider
  theme={{
    components: {
      Carousel: {
        colorPrimary: '#1677ff',
        dotSize: 3,
        arrowSize: 32,
      },
    },
  }}
>
  <App />
</ConfigProvider>
```

### 配置优先级

配置优先级从高到低：

1. **Props (style/className)** - 直接传入的样式属性
2. **组件级配置** - `theme.components.Carousel` 中的配置
3. **CSS 变量** - 全局 CSS 自定义属性
4. **Less 变量** - 默认值

### 可用的主题配置项

| 配置项 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| colorPrimary | 主色（激活指示点颜色） | `string` | 全局 primaryColor |
| dotSize | 指示点尺寸（像素） | `number` | `3` |
| arrowSize | 箭头按钮尺寸（像素） | `number` | `32` |

### 自定义 CSS 变量

也可以直接覆盖 CSS 变量实现更高级的定制：

```tsx
<Carousel
  style={{
    '--soui-carousel-color-primary': '#fa541c',
    '--soui-carousel-dot-size': '5px',
  }}
>
  ...
</Carousel>
```

## 设计原则

- 轮播内容应保持尺寸一致，避免切换时高度跳变
- 自动播放间隔建议不低于 3 秒，给用户足够的阅读时间
- 鼠标悬停时自动暂停播放，避免干扰用户操作

## 无障碍访问

- 指示点按钮提供 `aria-label` 描述目标位置
- 切换箭头提供 `aria-label`（上一张/下一张）
- 非激活幻灯片设置 `aria-hidden`（渐显模式）

## 相关资源

- [Card 卡片](/components/card)
- [Image 图片](/components/image)
