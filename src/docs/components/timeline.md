---
title: Timeline 时间轴
---

# Timeline 时间轴

垂直或水平展示时间流信息，支持左右交替、自定义节点、pending 状态。

## 何时使用

- 按时间顺序展示操作记录、日志、流程节点
- 需要体现时间先后关系的场景

## 代码示例

### 基础用法

```tsx
import { Timeline } from '@soui/ui';

export default () => (
  <Timeline
    items={[
      { children: '创建项目 2024-01-01' },
      { children: '完成需求评审 2024-01-15' },
      { children: '提交测试 2024-02-01' },
      { children: '正式上线 2024-03-01' },
    ]}
  />
);
```

### 圆圈颜色

```tsx
import { Timeline } from '@soui/ui';

export default () => (
  <Timeline
    items={[
      { color: 'green', children: '发布成功' },
      { color: 'blue', children: '部署中' },
      { color: 'red', children: '构建失败' },
      { color: 'gray', children: '已取消' },
      { color: '#722ed1', children: '自定义紫色节点' },
    ]}
  />
);
```

### 交替显示

```tsx
import { Timeline } from '@soui/ui';

export default () => (
  <Timeline
    mode="alternate"
    items={[
      {
        label: '2024-01-01',
        children: '项目立项',
        color: 'green',
      },
      {
        label: '2024-01-15',
        children: '需求评审通过',
      },
      {
        label: '2024-02-01',
        children: '提交测试',
        color: 'blue',
      },
      {
        label: '2024-02-15',
        children: '修复严重 Bug',
        color: 'red',
      },
      {
        label: '2024-03-01',
        children: '正式上线 v1.0.0',
        color: 'green',
      },
    ]}
  />
);
```

### 自定义时间轴点

```tsx
import { Timeline, Icon } from '@soui/ui';

export default () => (
  <Timeline
    items={[
      {
        dot: <Icon name="CheckCorrect" size={16} style={{ color: '#52c41a' }} />,
        children: '需求确认完成',
        color: 'green',
      },
      {
        dot: <Icon name="CheckCorrect" size={16} style={{ color: '#52c41a' }} />,
        children: 'UI 设计完成',
        color: 'green',
      },
      {
        dot: <Icon name="Time" size={16} style={{ color: '#1677ff' }} />,
        children: '开发进行中',
        color: 'blue',
      },
      {
        dot: <Icon name="Attention" size={16} style={{ color: '#faad14' }} />,
        children: '待测试验收',
        color: 'gray',
      },
    ]}
  />
);
```

### Pending 加载中

```tsx
import { Timeline } from '@soui/ui';

export default () => (
  <Timeline
    pending="正在处理中..."
    items={[
      { children: '订单已创建' },
      { children: '支付成功' },
      { children: '商家已接单' },
    ]}
  />
);
```

### 连接线类型

```tsx
import { Timeline } from '@soui/ui';

export default () => (
  <div style={{ display: 'flex', gap: 48 }}>
    <div>
      <p style={{ marginBottom: 12, color: '#666' }}>dashed 虚线</p>
      <Timeline
        lineType="dashed"
        items={[
          { children: '创建项目 2024-01-01' },
          { children: '完成需求评审 2024-01-15' },
          { children: '提交测试 2024-02-01' },
        ]}
      />
    </div>
    <div>
      <p style={{ marginBottom: 12, color: '#666' }}>dotted 点线</p>
      <Timeline
        lineType="dotted"
        items={[
          { children: '创建项目 2024-01-01' },
          { children: '完成需求评审 2024-01-15' },
          { children: '提交测试 2024-02-01' },
        ]}
      />
    </div>
    <div>
      <p style={{ marginBottom: 12, color: '#666' }}>混合使用</p>
      <Timeline
        items={[
          { children: '创建项目 2024-01-01' },
          { lineType: 'dashed', children: '需求变更 2024-01-20' },
          { lineType: 'dotted', children: '提交测试 2024-02-01' },
          { children: '正式上线 2024-03-01' },
        ]}
      />
    </div>
  </div>
);
```

### 横向时间轴

```tsx
import { Timeline } from '@soui/ui';

export default () => (
  <Timeline
    direction="horizontal"
    items={[
      { children: '创建项目 2024-01-01' },
      { color: 'green', children: '完成需求评审 2024-01-15' },
      { color: 'green', children: '提交测试 2024-02-01' },
      { children: '正式上线 2024-03-01' },
    ]}
  />
);
```

### 主题定制

```tsx
import { Timeline, ConfigProvider } from '@soui/ui';

export default () => (
  <ConfigProvider
    theme={{
      components: {
        Timeline: {
          colorPrimary: '#722ed1',
          colorDot: '#722ed1',
          colorTail: '#d3adf7',
          fontSize: 16,
        },
      },
    }}
  >
    <Timeline
      items={[
        { children: '节点 A — 主色已定制' },
        { children: '节点 B — 线条颜色已定制' },
        { children: '节点 C — 字号已定制' },
      ]}
    />
  </ConfigProvider>
);
```

## API

### Timeline

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| mode | 模式（仅 vertical 方向生效） | `'left' \| 'right' \| 'alternate'` | `'left'` |
| direction | 方向 | `'vertical' \| 'horizontal'` | `'vertical'` |
| pending | 末尾追加 pending 节点，`true` 显示默认 loading 点 | ReactNode \| boolean | - |
| pendingDot | 自定义 pending 图标 | ReactNode | - |
| reverse | 逆序排列 | boolean | `false` |
| lineType | 连接线类型 | `'solid' \| 'dashed' \| 'dotted'` | `'solid'` |
| items | 时间轴节点数据 | TimelineItemProps[] | - |
| children | 子节点（与 items 二选一，支持 Timeline.Item 写法） | ReactNode | - |

### TimelineItemProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| color | 圆圈颜色，不设置时跟随主题色 | `'blue' \| 'red' \| 'green' \| 'gray' \| string` | - |
| dot | 自定义时间轴点 | ReactNode | - |
| label | 标签（仅 alternate 模式生效） | ReactNode | - |
| children | 内容 | ReactNode | - |
| position | 指定位置（仅 alternate 模式） | `'left' \| 'right'` | - |
| loading | 加载中状态 | boolean | `false` |
| lineType | 连接线类型（覆盖全局） | `'solid' \| 'dashed' \| 'dotted'` | - |

## 主题定制

通过 `ConfigProvider` 的 `theme.components.Timeline` 配置：

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| colorPrimary | 主色（loading 动画颜色） | string | `'#1677ff'` |
| colorDot | 圆圈默认颜色 | string | `'#1677ff'` |
| colorTail | 尾巴线条颜色 | string | `'#f0f0f0'` |
| fontSize | 字体大小（像素） | number | `14` |
