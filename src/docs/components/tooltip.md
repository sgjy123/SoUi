# Tooltip 文字提示

简单的文字提示气泡框，用于展示额外的信息。

## 何时使用

- 鼠标悬停时显示提示信息
- 需要为按钮、图标等元素添加说明文字
- 空间有限无法完整展示内容时
- 需要提供操作指引或补充说明

## 代码演示

### 基础用法

最简单的用法，鼠标悬停显示提示信息。

```tsx
import { Tooltip, Button } from '@soui/ui';

export default () => (
  <Tooltip title="这是一个提示">
    <Button>悬停显示提示</Button>
  </Tooltip>
);
```

### 弹出位置

支持 12 个不同的弹出位置，可以灵活选择提示框的展示方向。

```tsx
import { Tooltip, Button, Space } from '@soui/ui';

export default () => (
  <Space wrap>
    <Tooltip title="上方" placement="top">
      <Button>top</Button>
    </Tooltip>
    <Tooltip title="左上方" placement="topLeft">
      <Button>topLeft</Button>
    </Tooltip>
    <Tooltip title="右上方" placement="topRight">
      <Button>topRight</Button>
    </Tooltip>
    <Tooltip title="左侧" placement="left">
      <Button>left</Button>
    </Tooltip>
    <Tooltip title="右侧" placement="right">
      <Button>right</Button>
    </Tooltip>
    <Tooltip title="下方" placement="bottom">
      <Button>bottom</Button>
    </Tooltip>
    <Tooltip title="左下方" placement="bottomLeft">
      <Button>bottomLeft</Button>
    </Tooltip>
    <Tooltip title="右下方" placement="bottomRight">
      <Button>bottomRight</Button>
    </Tooltip>
  </Space>
);
```

### 触发方式

支持 hover、click、focus、contextMenu 四种触发方式。

```tsx
import { Tooltip, Button, Space } from '@soui/ui';

export default () => (
  <Space wrap>
    <Tooltip title="悬停触发" trigger="hover">
      <Button>hover</Button>
    </Tooltip>
    <Tooltip title="点击触发" trigger="click">
      <Button type="primary">click</Button>
    </Tooltip>
    <Tooltip title="聚焦触发" trigger="focus">
      <Button type="dashed">focus</Button>
    </Tooltip>
    <Tooltip title="右键触发" trigger="contextMenu">
      <Button type="text">contextMenu</Button>
    </Tooltip>
  </Space>
);
```

### 受控模式

通过 `open` 和 `onOpenChange` 属性控制提示框的显示和隐藏。

```tsx
import { useState } from 'react';
import { Tooltip, Button, Space } from '@soui/ui';

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <Space direction="vertical">
      <Tooltip
        title="受控模式的提示框"
        open={open}
        onOpenChange={(visible) => setOpen(visible)}
      >
        <Button>受控模式（当前：{open ? '显示' : '隐藏'}）</Button>
      </Tooltip>
      <Button onClick={() => setOpen(!open)}>
        切换显示状态
      </Button>
    </Space>
  );
};
```

### 延迟显示/隐藏

通过 `mouseEnterDelay` 和 `mouseLeaveDelay` 设置延迟时间（秒）。

```tsx
import { Tooltip, Button, Space } from '@soui/ui';

export default () => (
  <Space wrap>
    <Tooltip title="延迟 0.5 秒显示" mouseEnterDelay={0.5}>
      <Button>延迟显示</Button>
    </Tooltip>
    <Tooltip title="延迟 1 秒隐藏" mouseLeaveDelay={1}>
      <Button type="primary">延迟隐藏</Button>
    </Tooltip>
  </Space>
);
```

### 销毁 DOM

通过 `destroyOnHidden` 属性控制关闭后是否销毁浮层 DOM，默认为 false。

```tsx
import { Tooltip, Button, Space } from '@soui/ui';

export default () => (
  <Space wrap>
    <Tooltip title="关闭后不销毁 DOM" destroyOnHidden={false}>
      <Button>不销毁（默认）</Button>
    </Tooltip>
    <Tooltip title="关闭后销毁 DOM" destroyOnHidden>
      <Button type="primary">销毁 DOM</Button>
    </Tooltip>
  </Space>
);
```

### 自定义容器

通过 `getPopupContainer` 指定浮层渲染的父节点，默认渲染到 body 上。

```tsx
import { Tooltip, Button } from '@soui/ui';

export default () => (
  <div id="custom-container" style={{ padding: '20px', border: '1px solid #d9d9d9' }}>
    <Tooltip
      title="浮层将渲染在此容器内"
      getPopupContainer={(triggerNode) => triggerNode.parentElement!}
    >
      <Button>自定义容器</Button>
    </Tooltip>
  </div>
);
```

## API

### 属性

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| title | 提示文字 | `React.ReactNode` | - | - |
| trigger | 触发方式 | `TooltipTrigger \| TooltipTrigger[]` | `'hover'` | - |
| placement | 弹出位置 | `TooltipPlacement` | `'top'` | - |
| open | 是否可见（受控） | `boolean` | - | - |
| defaultOpen | 默认是否可见（非受控） | `boolean` | `false` | - |
| getPopupContainer | 浮层渲染父节点，默认渲染到 body 上 | `(triggerNode: HTMLElement) => HTMLElement` | - | - |
| destroyOnHidden | 关闭后是否销毁 dom | `boolean` | `false` | - |
| mouseEnterDelay | 鼠标移入延迟（秒） | `number` | `0.1` | - |
| mouseLeaveDelay | 鼠标移出延迟（秒） | `number` | `0.1` | - |
| onOpenChange | 显示变化回调 | `(open: boolean) => void` | - | - |
| className | 自定义类名 | `string` | - | - |
| overlayClassName | 浮层类名 | `string` | - | - |
| style | 自定义样式 | `React.CSSProperties` | - | - |
| overlayStyle | 浮层样式 | `React.CSSProperties` | - | - |

### TooltipPlacement

```typescript
type TooltipPlacement =
  | 'top' | 'topLeft' | 'topRight'
  | 'bottom' | 'bottomLeft' | 'bottomRight'
  | 'left' | 'leftTop' | 'leftBottom'
  | 'right' | 'rightTop' | 'rightBottom';
```

### TooltipTrigger

```typescript
type TooltipTrigger = 'hover' | 'click' | 'focus' | 'contextMenu';
```

## 设计原则

### ✅ 推荐用法

```tsx
// 简洁明了的提示文字
<Tooltip title="保存更改">
  <Button icon={<Icon name="Save" />}>保存</Button>
</Tooltip>

// 使用合适的触发方式
<Tooltip title="点击删除" trigger="click">
  <Button danger>删除</Button>
</Tooltip>
```

### ❌ 避免使用

```tsx
// 避免过长的提示文字
<Tooltip title="这是一段非常非常长的提示文字，可能会影响用户体验...">
  <Button>按钮</Button>
</Tooltip>

// 避免在禁用元素上直接使用（需要使用外层包裹）
<Tooltip title="提示">
  <Button disabled>禁用按钮</Button>
</Tooltip>

// 正确做法：使用 span 包裹
<Tooltip title="提示">
  <span>
    <Button disabled>禁用按钮</Button>
  </span>
</Tooltip>
```

## 无障碍访问

- Tooltip 组件遵循 WAI-ARIA 规范
- 支持键盘操作，focus 触发方式可用于无障碍场景
- 提示文字应简洁明了，便于屏幕阅读器朗读

## FAQ

### Tooltip 在禁用按钮上不显示怎么办？

禁用的按钮不会触发鼠标事件，需要用外层元素包裹：

```tsx
<Tooltip title="提示">
  <span>
    <Button disabled>禁用按钮</Button>
  </span>
</Tooltip>
```

### 如何自定义浮层的样式？

可以使用 `overlayClassName` 和 `overlayStyle` 属性：

```tsx
<Tooltip
  title="提示"
  overlayClassName="my-tooltip"
  overlayStyle={{ backgroundColor: '#52c41a' }}
>
  <Button>绿色提示框</Button>
</Tooltip>
```

### getPopupContainer 的作用是什么？

`getPopupContainer` 用于指定浮层渲染的父节点。默认情况下浮层会渲染到 `body` 上，这在某些场景下可能导致定位问题（例如在固定容器内滚动时）。通过此属性可以将浮层渲染到指定的容器内：

```tsx
<Tooltip
  title="提示"
  getPopupContainer={(triggerNode) => triggerNode.parentElement!}
>
  <Button>自定义容器</Button>
</Tooltip>
```

### destroyOnHidden 有什么作用？

`destroyOnHidden` 控制关闭后是否销毁浮层 DOM。默认为 `false`，即关闭后保留 DOM 节点，这样下次打开时无需重新创建，性能更好。设置为 `true` 会在关闭时销毁 DOM，适用于对内存敏感的场景。

## 相关资源

- [Popover 气泡卡片](/components/popover)
- [Typography 排版](/components/typography)
