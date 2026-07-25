---
title: InfiniteList 无限加载
---

# InfiniteList 无限加载

滚动加载更多的列表数据，适用于长列表、信息流等场景。

## 何时使用

- 需要展示大量列表数据，不希望一次性加载全部
- 信息流、评论列表、商品列表等需要无限滚动的场景
- 移动端下拉加载更多

## 代码示例

### 基础用法

滚动到底部自动触发 `onLoadMore` 加载更多数据，通过 `hasMore` 控制是否继续加载。

```tsx
import { InfiniteList, useState, useCallback } from '@soui/ui';

export default () => {
  const [data, setData] = useState(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      title: `列表项 #${i + 1}`,
      description: `这是第 ${i + 1} 条数据的描述内容。`,
    })),
  );
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      const newData = Array.from({ length: 10 }, (_, i) => ({
        id: data.length + i + 1,
        title: `列表项 #${data.length + i + 1}`,
        description: `这是第 ${data.length + i + 1} 条数据的描述内容。`,
      }));
      setData((prev) => [...prev, ...newData]);
      setLoading(false);
      if (data.length + newData.length >= 50) {
        setHasMore(false);
      }
    }, 1000);
  }, [data.length]);

  return (
    <InfiniteList
      dataSource={data}
      loading={loading}
      hasMore={hasMore}
      onLoadMore={loadMore}
      height={300}
      keyExtractor={(item) => item.id}
      renderItem={(item) => (
        <div>
          <div style={{ fontWeight: 600 }}>{item.title}</div>
          <div style={{ color: '#666', fontSize: 13, marginTop: 4 }}>{item.description}</div>
        </div>
      )}
    />
  );
};
```

### 自定义列表项

通过 `renderItem` 自定义每一项的渲染内容，可配合 Avatar 等组件实现丰富的列表样式。

```tsx
import { InfiniteList, Avatar, useState, useCallback } from '@soui/ui';

export default () => {
  const names = ['张三', '李四', '王五', '赵六', '孙七', '周八', '吴九', '郑十'];
  const [data, setData] = useState(() =>
    Array.from({ length: 15 }, (_, i) => ({
      id: i + 1,
      name: names[i % names.length],
      email: `user${i + 1}@example.com`,
    })),
  );
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      const newData = Array.from({ length: 10 }, (_, i) => ({
        id: data.length + i + 1,
        name: names[(data.length + i) % names.length],
        email: `user${data.length + i + 1}@example.com`,
      }));
      setData((prev) => [...prev, ...newData]);
      setLoading(false);
      if (data.length + newData.length >= 50) {
        setHasMore(false);
      }
    }, 800);
  }, [data.length]);

  return (
    <InfiniteList
      dataSource={data}
      loading={loading}
      hasMore={hasMore}
      onLoadMore={loadMore}
      height={320}
      keyExtractor={(item) => item.id}
      renderItem={(item) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Avatar>{item.name.charAt(0)}</Avatar>
          <div>
            <div style={{ fontWeight: 500 }}>{item.name}</div>
            <div style={{ color: '#888', fontSize: 13 }}>{item.email}</div>
          </div>
        </div>
      )}
    />
  );
};
```

### 主题定制

通过 ConfigProvider 自定义列表的背景色、边框色、悬停色等主题变量。

```tsx
import { InfiniteList, ConfigProvider, useState, useCallback } from '@soui/ui';

export default () => {
  const [data, setData] = useState(() =>
    Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      text: `主题定制项 #${i + 1}`,
    })),
  );
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      const newData = Array.from({ length: 5 }, (_, i) => ({
        id: data.length + i + 1,
        text: `主题定制项 #${data.length + i + 1}`,
      }));
      setData((prev) => [...prev, ...newData]);
      setLoading(false);
      if (data.length + newData.length >= 25) {
        setHasMore(false);
      }
    }, 800);
  }, [data.length]);

  return (
    <ConfigProvider
      theme={{
        components: {
          InfiniteList: {
            colorBg: '#f6f8fa',
            colorBorder: '#d0d7de',
            itemHoverBg: '#eaeef2',
            borderRadius: 12,
          },
        },
      }}
    >
      <InfiniteList
        dataSource={data}
        loading={loading}
        hasMore={hasMore}
        onLoadMore={loadMore}
        height={280}
        keyExtractor={(item) => item.id}
        renderItem={(item) => (
          <div style={{ fontWeight: 500 }}>{item.text}</div>
        )}
      />
    </ConfigProvider>
  );
};
```

## API

### InfiniteList

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| dataSource | 数据源 | `any[]` | `[]` |
| renderItem | 渲染每一项 | `(item: any, index: number) => ReactNode` | - |
| loading | 是否正在加载 | `boolean` | `false` |
| hasMore | 是否还有更多数据 | `boolean` | `true` |
| onLoadMore | 加载更多回调 | `() => void` | - |
| threshold | 触底加载阈值（像素） | `number` | `100` |
| height | 容器高度（数字为 px，字符串如 `'100vh'`） | `number \| string` | `400` |
| loadingContent | 自定义加载中内容 | `ReactNode` | - |
| noMoreContent | 自定义"没有更多"内容 | `ReactNode` | - |
| emptyContent | 自定义空状态内容 | `ReactNode` | - |
| keyExtractor | 提取唯一 key | `(item: any, index: number) => string \| number` | - |
| itemClassName | 列表项类名 | `string` | - |
| itemStyle | 列表项样式 | `CSSProperties` | - |
| showScrollbar | 是否显示滚动条 | `boolean` | `false` |
| onScroll | 滚动事件回调 | `(e: UIEvent) => void` | - |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |

## 主题定制

InfiniteList 作为标准 React 组件渲染在 ConfigProvider 的 DOM 树内，通过 CSS 变量继承自动获取主题配置，无需额外桥接。

### 组件级配置

通过 `theme.components.InfiniteList` 针对组件进行精细化配置：

```tsx
<ConfigProvider
  theme={{
    components: {
      InfiniteList: {
        colorBg: '#f6f8fa',
        colorBorder: '#d0d7de',
        itemHoverBg: '#eaeef2',
        borderRadius: 12,
        fontSize: 14,
      },
    },
  }}
>
  <YourApp />
</ConfigProvider>
```

### 可用的主题配置项

| 配置项 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| colorBg | 背景色 | `string` | `'#fff'` |
| colorText | 文本颜色 | `string` | `'rgba(0, 0, 0, 0.88)'` |
| colorBorder | 边框颜色 | `string` | `'#f0f0f0'` |
| itemHoverBg | 列表项悬停背景色 | `string` | `'rgba(0, 0, 0, 0.02)'` |
| itemActiveBg | 列表项激活背景色 | `string` | `'rgba(0, 0, 0, 0.04)'` |
| borderRadius | 圆角（像素） | `number` | `6` |
| fontSize | 字体大小（像素） | `number` | `14` |

### 自定义 CSS 变量

对于更高级的定制需求，可以直接覆盖 CSS 变量：

```tsx
<InfiniteList
  style={{
    '--soui-infinite-list-color-bg': '#f6f8fa',
    '--soui-infinite-list-border-radius': '12px',
  }}
/>
```

## 设计原则

### 推荐用法

```tsx
// 使用 keyExtractor 提供唯一 key，提升渲染性能
<InfiniteList
  keyExtractor={(item) => item.id}
  renderItem={...}
/>
```

### 避免使用

```tsx
// 不设置 keyExtractor 时会使用 index 作为 key，数据动态增删时可能导致渲染问题
<InfiniteList
  renderItem={...}
/>
```

## 无障碍访问

- 列表容器使用 `role="list"`
- 每个列表项使用 `role="listitem"`
- 加载中状态使用 Loading 组件内置的 `role="status"` + `aria-live="polite"`

## FAQ

### 如何自定义"加载中"和"没有更多"的提示？

使用 `loadingContent` 和 `noMoreContent` 属性传入自定义 React 节点即可完全替换默认内容。

### 阈值（threshold）设多少合适？

默认 100px 适合大多数场景。如果列表项高度较大，可以适当增大阈值（如 200），让用户在距离底部还有一段距离时就开始加载，体验更流畅。

### 如何配合 Form 或虚拟滚动使用？

InfiniteList 是一个轻量容器组件，可以与其他组件自由组合。如需虚拟滚动，建议结合 `react-virtual` 等库使用。
