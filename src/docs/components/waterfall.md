# Waterfall 瀑布流

以瀑布流形式排列不等高内容的布局容器，每个元素自动放入当前最短列，实现紧凑的视觉排列。

## 何时使用

- 需要展示不等高的卡片、图片等内容，且希望紧凑排列时。
- 图片画廊、商品列表、资讯流等场景。
- 需要响应式列数适配不同屏幕宽度时。

## 代码演示

### 基础用法

通过 `items` 数据源和 `renderItem` 渲染函数实现瀑布流布局。每个 item 可预设 `height` 避免 DOM 测量。

```tsx
import { Waterfall } from '@soui/ui';
import type { WaterfallItem } from '@soui/ui';

const items: WaterfallItem[] = Array.from({ length: 12 }, (_, i) => ({
  key: `item-${i}`,
  height: 80 + Math.floor(Math.random() * 120),
  title: `卡片 ${i + 1}`,
}));

export default () => (
  <Waterfall
    columns={3}
    gutter={16}
    items={items}
    renderItem={(item) => (
      <div style={{ height: item.height, background: '#f0f5ff', borderRadius: 8 }}>
        {item.title}
      </div>
    )}
  />
);
```

### 响应式列数

`columns` 支持传入断点对象，根据容器宽度自动切换列数。断点命名与 SoUi Grid 一致。

```tsx
import { Waterfall } from '@soui/ui';

export default () => (
  <Waterfall
    columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
    gutter={12}
    items={items}
    renderItem={(item) => <div style={{ height: item.height }}>{item.title}</div>}
  />
);
```

### 自定义间距

`gutter` 支持传入数组 `[水平间距, 垂直间距]` 分别控制两个方向的间距。

```tsx
import { Waterfall } from '@soui/ui';

export default () => (
  <Waterfall
    columns={3}
    gutter={[24, 8]}
    items={items}
    renderItem={(item) => <div style={{ height: item.height }}>{item.title}</div>}
  />
);
```

### 图片画廊

模拟图片画廊场景，展示不等高内容的瀑布流排列。配合 `fresh` 属性可在图片加载完成后自动重新布局。

```tsx
import { Waterfall } from '@soui/ui';

export default () => (
  <Waterfall
    columns={4}
    gutter={[12, 12]}
    fresh
    items={galleryItems}
    renderItem={(item) => (
      <div style={{ height: item.height, background: item.color, borderRadius: 8 }}>
        {item.label}
      </div>
    )}
  />
);
```

### 无限加载

结合 `IntersectionObserver` 监听哨兵元素进入视口，自动触发加载更多数据。适用于信息流、商品列表等需要分页加载的场景。

```tsx
import { Waterfall } from '@soui/ui';
import { useState, useCallback, useRef, useEffect } from 'react';

export default () => {
  const [items, setItems] = useState(() => generateItems(12));
  const [loading, setLoading] = useState(false);
  const sentinelRef = useRef(null);

  const loadMore = useCallback(() => {
    if (loading) return;
    setLoading(true);
    setTimeout(() => {
      setItems((prev) => [...prev, ...generateItems(8)]);
      setLoading(false);
    }, 800);
  }, [loading]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) loadMore(); },
      { rootMargin: '200px' },
    );
    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [loadMore]);

  return (
    <div>
      <Waterfall columns={4} gutter={[12, 12]} items={items} renderItem={renderCard} />
      <div ref={sentinelRef} style={{ height: 1 }} />
      {loading && <div style={{ textAlign: 'center', padding: 16 }}>加载中...</div>}
    </div>
  );
};
```

## API

### Waterfall

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| items | 数据源数组 | `WaterfallItem[]` | `-` | - |
| renderItem | 自定义渲染每个项 | `(item: WaterfallItem, index: number) => ReactNode` | `-` | - |
| children | 子节点模式（与 items 二选一） | `ReactNode` | `-` | - |
| columns | 列数，支持固定值或响应式断点对象，有效范围 1~20 | `number \| WaterfallBreakpoints` | `3` | - |
| gutter | 间距，支持统一值或 [水平, 垂直] | `number \| [number, number]` | `16` | - |
| onLayoutChange | 布局变化回调 | `(layout: WaterfallLayoutInfo[]) => void` | `-` | - |
| fresh | 是否持续监听子元素尺寸变化（适用于图片异步加载） | `boolean` | `false` | - |

### WaterfallItem

| 参数 | 说明 | 类型 |
|------|------|------|
| key | 唯一标识 | `React.Key` |
| height | 预设高度（提供后无需 DOM 测量，提升性能） | `number` |
| children | 直接渲染内容（优先于 renderItem） | `ReactNode` |
| [prop] | 任意业务数据 | `any` |

### WaterfallBreakpoints

| 参数 | 说明 | 类型 |
|------|------|------|
| xs | 容器宽度 < 576px 时的列数 | `number` |
| sm | 容器宽度 >= 576px 时的列数 | `number` |
| md | 容器宽度 >= 768px 时的列数 | `number` |
| lg | 容器宽度 >= 992px 时的列数 | `number` |
| xl | 容器宽度 >= 1200px 时的列数 | `number` |
| xxl | 容器宽度 >= 1600px 时的列数 | `number` |

### WaterfallLayoutInfo

| 参数 | 说明 | 类型 |
|------|------|------|
| key | 项的唯一标识 | `React.Key` |
| column | 所在列索引 | `number` |
| top | 顶部偏移（像素） | `number` |
| left | 左侧偏移（像素） | `number` |
| width | 项宽度（像素） | `number` |
| height | 项高度（像素） | `number` |

## 主题定制

Waterfall 作为标准 React 组件渲染在 ConfigProvider 的 DOM 树内，通过 CSS 变量继承自动获取主题配置，无需额外桥接。

### 组件级配置

通过 `theme.components.Waterfall` 针对组件进行精细化配置：

```tsx
<ConfigProvider
  theme={{
    components: {
      Waterfall: {
        borderRadius: 12,
        gutter: 20,
      },
    },
  }}
>
  <YourApp />
</ConfigProvider>
```

### 配置优先级

配置优先级从高到低：

1. **Props (style/className)** - 直接传入的样式属性
2. **组件级配置** - `theme.components.Waterfall` 中的配置
3. **CSS 变量** - 全局 CSS 自定义属性
4. **Less 变量** - 默认值

### 可用的主题配置项

| 配置项 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| borderRadius | 子项圆角（像素） | `number` | `6` |
| gutter | 默认间距（像素） | `number` | `16` |

### 自定义 CSS 变量

对于更高级的定制需求，可以直接覆盖 CSS 变量：

```tsx
<Waterfall
  style={{
    '--soui-waterfall-border-radius': '12px',
    '--soui-waterfall-gutter': '20px',
  }}
/>
```

## 设计原则

### 推荐用法

```tsx
// 预设 height 避免 DOM 测量，提升首次渲染性能
const items = data.map(d => ({ key: d.id, height: d.knownHeight, ...d }));
<Waterfall columns={3} items={items} renderItem={renderCard} />

// 图片场景使用 fresh 监听加载完成
<Waterfall columns={4} fresh items={images} renderItem={renderImage} />
```

### 避免使用

```tsx
// 避免在 renderItem 中返回无高度约束的内容（会导致频繁重排）
<Waterfall renderItem={() => <div>无固定高度的内容...</div>} />

// 避免 columns 设置过大（超过 20 列会被修正）
<Waterfall columns={50} />
```

## 无障碍访问

组件遵循 WAI-ARIA 规范：

- 容器使用 `role="list"` 语义化标签（可通过 rest props 传入）
- 子项使用 `role="listitem"` 标识
- 布局变化不触发焦点移动，保持用户阅读位置

## FAQ

### items 模式和 children 模式有什么区别？

`items` 模式是数据驱动的，组件内部遍历数据并调用 `renderItem`，适合动态数据场景。`children` 模式直接渲染传入的子节点，适合静态内容。两者二选一，`items` 优先。

### 为什么首次渲染时元素会闪烁？

如果未提供 `height` 预设值，组件需要先渲染再测量 DOM 高度后计算布局。可通过为每个 item 提供 `height` 字段来避免闪烁，实现同步布局。

### fresh 属性会影响性能吗？

`fresh` 使用 MutationObserver 监听 DOM 变化，适用于图片等异步加载场景。如果内容是静态的，建议关闭此选项以避免不必要的重排计算。

## 相关资源

- [Grid 栅格](/components/grid)
- [Calendar 日历](/components/calendar)
