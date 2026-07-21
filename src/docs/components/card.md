# Card 卡片

通用卡片容器，可承载文字、列表、图片、段落等内容。

## 何时使用

- 需要展示一个信息区块的概览时
- 一组相关内容需要聚合展示时
- 需要统一的容器样式（标题、操作、封面）时

## 代码演示

### 基础用法

带标题和右侧操作区的基础卡片。

```tsx
import { Card } from '@soui/ui';

export default () => (
  <Card title="卡片标题" extra={<a href="#">更多</a>} style={{ width: 360 }}>
    <p>卡片内容一</p>
    <p>卡片内容二</p>
  </Card>
);
```

### 边框与悬停

`bordered={false}` 去除边框，`hoverable` 开启悬停浮起效果。

```tsx
import { Card, Space } from '@soui/ui';

export default () => (
  <Space size={16}>
    <Card title="有边框" style={{ width: 240 }}>内容</Card>
    <Card title="无边框" bordered={false} style={{ width: 240 }}>内容</Card>
    <Card title="悬停浮起" hoverable style={{ width: 240 }}>内容</Card>
  </Space>
);
```

### 尺寸

支持默认和小尺寸两种卡片。

```tsx
import { Card, Space } from '@soui/ui';

export default () => (
  <Space size={16}>
    <Card title="默认尺寸" style={{ width: 260 }}>内容</Card>
    <Card title="小尺寸" size="small" style={{ width: 260 }}>内容</Card>
  </Space>
);
```

### 封面与操作

`cover` 展示封面，`Card.Meta` 展示头像/标题/描述，`actions` 定义底部操作栏。

```tsx
import { Card, Icon } from '@soui/ui';

export default () => (
  <Card
    hoverable
    style={{ width: 300 }}
    cover={<img alt="cover" src="https://picsum.photos/300/160" />}
    actions={[
      <Icon name="Setting" size={16} key="setting" />,
      <Icon name="Edit" size={16} key="edit" />,
      <Icon name="Share" size={16} key="share" />,
    ]}
  >
    <Card.Meta title="卡片标题" description="这里是描述文字" />
  </Card>
);
```

### 栅格

`Card.Grid` 将卡片内容栅格化展示。

```tsx
import { Card } from '@soui/ui';

export default () => (
  <Card title="卡片栅格">
    <Card.Grid style={{ width: '33.33%' }}>内容一</Card.Grid>
    <Card.Grid style={{ width: '33.33%' }}>内容二</Card.Grid>
    <Card.Grid style={{ width: '33.33%' }}>内容三</Card.Grid>
  </Card>
);
```

### 内嵌卡片

`type="inner"` 内嵌卡片，适用于嵌套在普通卡片中的场景。

```tsx
import { Card } from '@soui/ui';

export default () => (
  <Card title="外层卡片">
    <Card type="inner" title="内嵌卡片">
      内嵌卡片内容
    </Card>
  </Card>
);
```

### 加载中

`loading` 状态下显示骨架屏占位。

```tsx
import React, { useState } from 'react';
import { Card, Switch, Space } from '@soui/ui';

export default () => {
  const [loading, setLoading] = useState(true);

  return (
    <Space direction="vertical">
      <Switch checked={loading} onChange={setLoading} />
      <Card title="数据卡片" loading={loading} style={{ width: 400 }}>
        加载完成后展示的内容
      </Card>
    </Space>
  );
};
```

### 主题定制

通过 ConfigProvider 自定义卡片主题。

```tsx
import { Card, ConfigProvider } from '@soui/ui';

export default () => (
  <ConfigProvider
    theme={{
      components: {
        Card: {
          borderRadius: 16,
          borderColor: '#adc6ff',
          hoverShadow: '0 8px 24px rgba(47, 84, 235, 0.15)',
        },
      },
    }}
  >
    <Card title="自定义主题" hoverable style={{ width: 260 }}>
      大圆角 + 蓝色边框
    </Card>
  </ConfigProvider>
);
```

## API

### Card 属性

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| title | 卡片标题 | `ReactNode` | - |
| extra | 头部右侧操作区 | `ReactNode` | - |
| bordered | 是否有边框 | `boolean` | `true` |
| hoverable | 鼠标移入时浮起阴影 | `boolean` | `false` |
| size | 卡片尺寸 | `'default' \| 'small'` | `'default'` |
| type | 卡片类型 | `'inner'` | - |
| cover | 封面区域 | `ReactNode` | - |
| actions | 底部操作按钮组 | `ReactNode[]` | - |
| loading | 是否加载中 | `boolean` | `false` |
| bodyStyle | 内容区域自定义样式 | `CSSProperties` | - |
| headStyle | 头部区域自定义样式 | `CSSProperties` | - |

### Card.Grid 属性

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| hoverable | 鼠标移入时浮起阴影 | `boolean` | `true` |

### Card.Meta 属性

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| avatar | 头像 | `ReactNode` | - |
| title | 标题 | `ReactNode` | - |
| description | 描述 | `ReactNode` | - |

## 主题定制

Card 作为标准 React 组件渲染在 ConfigProvider 的 DOM 树内，通过 CSS 变量继承自动获取主题配置，无需额外桥接。

### 组件级配置

通过 `theme.components.Card` 进行精细化配置：

```tsx
<ConfigProvider
  theme={{
    components: {
      Card: {
        colorPrimary: '#2f54eb',
        colorBg: '#fff',
        headerBg: '#f0f5ff',
        borderColor: '#f0f0f0',
        borderRadius: 8,
        headerFontSize: 16,
        hoverShadow: '0 6px 16px rgba(0, 0, 0, 0.08)',
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
2. **组件级配置** - `theme.components.Card` 中的配置
3. **CSS 变量** - 全局 CSS 自定义属性
4. **Less 变量** - 默认值

### 可用的主题配置项

| 配置项 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| colorPrimary | 主色（操作栏悬停色） | `string` | 全局 primaryColor |
| colorBg | 卡片背景色 | `string` | `#fff` |
| headerBg | 头部背景色（内嵌卡片） | `string` | `#f5f5f5` |
| borderColor | 边框颜色 | `string` | `#f0f0f0` |
| borderRadius | 圆角大小（像素） | `number` | `6` |
| headerFontSize | 头部标题字号（像素） | `number` | `16` |
| hoverShadow | 悬停阴影 | `string` | 全局次级阴影 |

### 自定义 CSS 变量

也可以直接覆盖 CSS 变量实现更高级的定制：

```tsx
<Card
  title="自定义"
  style={{
    '--soui-card-border-radius': '16px',
    '--soui-card-color-bg': '#fafafa',
  }}
>
  内容
</Card>
```

## 设计原则

- 卡片内容应保持信息密度适中，避免单卡片承载过多内容
- 一组并列卡片建议统一尺寸和操作结构
- `hoverable` 适用于可点击跳转的卡片，纯展示卡片不建议开启

## 无障碍访问

- 卡片标题使用语义化结构，屏幕阅读器可正常朗读
- 操作栏项支持键盘聚焦（可通过内部元素 tabIndex 控制）

## 相关资源

- [Tag 标签](/components/tag)
- [Skeleton 骨架屏](/components/skeleton)
