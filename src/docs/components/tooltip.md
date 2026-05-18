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

支持 hover、click、focus、contextMenu 四种触发方式，也可以组合使用。

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

### 自定义样式

通过 `color`、`arrow`、`overlayClassName` 和 `overlayStyle` 自定义提示框样式。

```tsx
import { Tooltip, Button, Space } from '@soui/ui';

export default () => (
  <Space wrap>
    <Tooltip title="绿色背景" color="#52c41a">
      <Button>自定义颜色</Button>
    </Tooltip>
    <Tooltip 
      title="无箭头" 
      arrow={false}
      overlayStyle={{ borderRadius: '8px' }}
    >
      <Button type="primary">隐藏箭头</Button>
    </Tooltip>
  </Space>
);
```

### 禁用状态

通过 `disabled` 属性禁用 Tooltip，禁用后不会触发显示。

```tsx
import { Tooltip, Button, Space } from '@soui/ui';

export default () => (
  <Space wrap>
    <Tooltip title="正常状态">
      <Button>正常按钮</Button>
    </Tooltip>
    <Tooltip title="已禁用" disabled>
      <Button disabled>禁用按钮</Button>
    </Tooltip>
  </Space>
);
```

### 自动调整位置

通过 `autoAdjustOverflow` 控制是否自动调整位置以防止溢出视口，默认为 true。

```tsx
import { Tooltip, Button, Space } from '@soui/ui';

export default () => (
  <Space wrap>
    <Tooltip title="自动调整位置" autoAdjustOverflow>
      <Button>自动调整（默认）</Button>
    </Tooltip>
    <Tooltip title="不自动调整位置" autoAdjustOverflow={false}>
      <Button type="primary">手动调整</Button>
    </Tooltip>
  </Space>
);
```

### 销毁 DOM

通过 `destroyOnHidden` 属性控制关闭后是否销毁浮层 DOM，默认为 true。

```tsx
import { Tooltip, Button, Space } from '@soui/ui';

export default () => (
  <Space wrap>
    <Tooltip title="关闭后不销毁 DOM" destroyOnHidden={false}>
      <Button>不销毁</Button>
    </Tooltip>
    <Tooltip title="关闭后销毁 DOM" destroyOnHidden>
      <Button type="primary">销毁 DOM（默认）</Button>
    </Tooltip>
  </Space>
);
```

### 自定义容器

通过 `getPopupContainer` 指定浮层渲染的父节点，默认渲染到 body 上。

```tsx
import { Tooltip, Button } from '@soui/ui';

export default () => (
  <div style={{ padding: '20px', border: '1px solid #d9d9d9' }}>
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
| children | 子节点 | `React.ReactNode` | - | - |
| placement | 弹出位置 | `TooltipPlacement` | `'top'` | - |
| trigger | 触发方式 | `TooltipTrigger \| TooltipTrigger[]` | `'hover'` | - |
| open | 是否可见（受控） | `boolean` | - | - |
| defaultOpen | 默认是否可见（非受控） | `boolean` | `false` | - |
| disabled | 是否禁用 | `boolean` | `false` | - |
| fresh | 是否每次重新渲染内容 | `boolean` | `false` | - |
| destroyOnHidden | 关闭后是否销毁 DOM | `boolean` | `true` | - |
| autoAdjustOverflow | 是否自动调整位置以防止溢出 | `boolean` | `true` | - |
| arrow | 是否显示箭头 | `boolean` | `true` | - |
| color | 背景颜色 | `string` | - | - |
| zIndex | z-index | `number` | `1030` | - |
| mouseEnterDelay | 鼠标移入延迟（秒） | `number` | `0.1` | - |
| mouseLeaveDelay | 鼠标移出延迟（秒） | `number` | `0.1` | - |
| className | 触发器类名 | `string` | - | - |
| style | 触发器样式 | `React.CSSProperties` | - | - |
| overlayClassName | 浮层类名 | `string` | - | - |
| overlayStyle | 浮层样式 | `React.CSSProperties` | - | - |
| overlayInnerStyle | 浮层内部样式 | `React.CSSProperties` | - | - |
| getPopupContainer | 浮层渲染父节点 | `(triggerNode: HTMLElement) => HTMLElement` | - | - |
| onOpenChange | 显示变化回调 | `(open: boolean) => void` | - | - |

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
  <Button>保存</Button>
</Tooltip>

// 使用合适的触发方式
<Tooltip title="点击删除" trigger="click">
  <Button danger>删除</Button>
</Tooltip>

// 使用 disabled 属性禁用
<Tooltip title="功能未开放" disabled>
  <Button disabled>禁用按钮</Button>
</Tooltip>
```

### ❌ 避免使用

```tsx
// 避免过长的提示文字
<Tooltip title="这是一段非常非常长的提示文字，可能会影响用户体验...">
  <Button>按钮</Button>
</Tooltip>

// 避免不必要的 span 包裹（直接使用 disabled 属性即可）
<Tooltip title="提示">
  <span>
    <Button disabled>禁用按钮</Button>
  </span>
</Tooltip>
```

## 无障碍访问

- Tooltip 组件遵循 WAI-ARIA 规范
- 支持键盘操作，focus 触发方式可用于无障碍场景
- 按 ESC 键可以关闭显示的 Tooltip
- 提示文字应简洁明了，便于屏幕阅读器朗读

## FAQ

### 如何禁用 Tooltip？

直接使用 `disabled` 属性即可：

```tsx
<Tooltip title="提示" disabled>
  <Button disabled>禁用按钮</Button>
</Tooltip>
```

### 如何自定义浮层的样式？

可以使用 `color`、`overlayClassName` 和 `overlayStyle` 属性：

```tsx
<Tooltip
  title="提示"
  color="#52c41a"
  overlayClassName="my-tooltip"
  overlayStyle={{ borderRadius: '8px' }}
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

`destroyOnHidden` 控制关闭后是否销毁浮层 DOM。默认为 `true`，即关闭时销毁 DOM。设置为 `false` 会在关闭时保留 DOM 节点，这样下次打开时无需重新创建，性能更好：

```tsx
<Tooltip title="提示" destroyOnHidden={false}>
  <Button>保留 DOM</Button>
</Tooltip>
```

### 如何隐藏箭头？

设置 `arrow={false}` 即可：

```tsx
<Tooltip title="提示" arrow={false}>
  <Button>无箭头</Button>
</Tooltip>
```

## 相关资源

- [Popover 气泡卡片](/components/popover)
- [Typography 排版](/components/typography)

## 主题定制

Tooltip 组件支持通过 ConfigProvider 进行全局或组件级的主题定制。

### 全局配置

通过 `theme` 属性对所有 Tooltip 组件进行统一配置：

```tsx
import { ConfigProvider, Tooltip, Button } from '@soui/ui';

export default () => (
  <ConfigProvider
    theme={{
      // Tooltip 全局配置
      tooltipBgColor: 'rgba(0, 0, 0, 0.85)',
      tooltipTextColor: '#fff',
      tooltipFontSize: 13,
      tooltipLineHeight: 1.6,
      tooltipMaxWidth: 280,
      tooltipMinHeight: 34,
      tooltipPadding: '8px 14px',
      tooltipBorderRadius: 8,
      tooltipBoxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
      tooltipArrowSize: 9,
      tooltipZIndex: 1050,
      tooltipAnimationDuration: 0.25,
    }}
  >
    <Tooltip title="使用全局配置的提示框">
      <Button>悬停查看效果</Button>
    </Tooltip>
  </ConfigProvider>
);
```

### 组件级配置

通过 `components.Tooltip` 对 Tooltip 组件进行精细控制：

```tsx
import { ConfigProvider, Tooltip, Button } from '@soui/ui';

export default () => (
  <ConfigProvider
    theme={{
      components: {
        Tooltip: {
          // 颜色配置
          colorBgDefault: '#1f1f1f',
          colorText: '#ffffff',
          
          // 尺寸配置
          fontSize: 14,
          lineHeight: 1.7,
          maxWidth: 300,
          minHeight: 36,
          padding: '10px 16px',
          borderRadius: 10,
          
          // 视觉效果
          boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
          arrowSize: 10,
          arrowOffset: 18,
          
          // 层级与动画
          zIndex: 1060,
          animationDuration: 0.3,
          animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
        },
      },
    }}
  >
    <Tooltip title="使用组件级配置的提示框">
      <Button type="primary">自定义样式</Button>
    </Tooltip>
  </ConfigProvider>
);
```

### 配置项说明

**全局配置（ThemeConfig）**

| 配置项 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| tooltipBgColor | 默认背景色 | `string` | `'rgba(0, 0, 0, 0.88)'` |
| tooltipTextColor | 文本颜色 | `string` | `'#fff'` |
| tooltipFontSize | 字体大小（像素） | `number` | `12` |
| tooltipLineHeight | 行高 | `number` | `1.6667` |
| tooltipMaxWidth | 最大宽度（像素） | `number` | `250` |
| tooltipMinHeight | 最小高度（像素） | `number` | `32` |
| tooltipPadding | 内边距 | `string` | `'6px 12px'` |
| tooltipBorderRadius | 圆角（像素） | `number` | `6` |
| tooltipBoxShadow | 阴影 | `string` | `'0 3px 6px -4px ...'` |
| tooltipArrowSize | 箭头尺寸（像素） | `number` | `8` |
| tooltipZIndex | z-index | `number` | `1030` |
| tooltipAnimationDuration | 动画时长（秒） | `number` | `0.2` |

**组件级配置（components.Tooltip）**

| 配置项 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| colorBgDefault | 默认背景色 | `string` | 继承全局配置 |
| colorText | 文本颜色 | `string` | 继承全局配置 |
| fontSize | 字体大小（像素） | `number` | 继承全局配置 |
| lineHeight | 行高 | `number` | 继承全局配置 |
| maxWidth | 最大宽度（像素） | `number` | 继承全局配置 |
| minHeight | 最小高度（像素） | `number` | 继承全局配置 |
| padding | 内边距 | `string` | 继承全局配置 |
| borderRadius | 圆角（像素） | `number` | 继承全局配置 |
| boxShadow | 阴影 | `string` | 继承全局配置 |
| arrowSize | 箭头尺寸（像素） | `number` | 继承全局配置 |
| arrowOffset | 箭头偏移量（像素） | `number` | - |
| zIndex | z-index | `number` | 继承全局配置 |
| animationDuration | 动画时长（秒） | `number` | 继承全局配置 |
| animationTimingFunction | 动画缓动函数 | `string` | - |

### 优先级说明

Tooltip 样式的优先级从高到低为：

1. **Props 属性**（如 `color`、`zIndex`）- 最高优先级
2. **组件级配置**（`components.Tooltip`）
3. **全局配置**（`theme.tooltip*`）
4. **CSS 变量**（`:root` 中定义）
5. **Less 变量**（`variables.less` 中定义）- 最低优先级

**注意：** Props 中的 `color` 属性会直接覆盖所有主题配置的背景色。
