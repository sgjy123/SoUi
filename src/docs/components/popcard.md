# PopCard 气泡卡片

点击或悬停元素时弹出的卡片式浮层，可承载标题和富文本内容。

## 何时使用

- 需要展示比 Tooltip 更丰富的内容（标题 + 正文 + 操作）时
- 需要悬浮卡片承载链接、按钮等交互元素时
- 目标元素的操作说明或详情预览

## 代码演示

### 基础用法

悬停弹出带标题和内容的气泡卡片。

```tsx
import { PopCard, Button } from '@soui/ui';

export default () => (
  <PopCard title="卡片标题" content={<div>气泡卡片的内容区域。</div>}>
    <Button type="primary">悬停弹出</Button>
  </PopCard>
);
```

### 触发方式

`trigger` 支持 `hover`、`click`、`focus`、`contextMenu`。

```tsx
import { PopCard, Button, Space } from '@soui/ui';

export default () => (
  <Space>
    <PopCard title="Click" content="内容" trigger="click">
      <Button>点击</Button>
    </PopCard>
    <PopCard title="Focus" content="内容" trigger="focus">
      <Button>聚焦</Button>
    </PopCard>
  </Space>
);
```

### 弹出位置

`placement` 支持十二个方向。

```tsx
import { PopCard, Button } from '@soui/ui';

export default () => (
  <PopCard title="topRight" content="内容" placement="topRight">
    <Button>topRight</Button>
  </PopCard>
);
```

### 主题定制

通过 ConfigProvider 自定义气泡卡片主题。

```tsx
import { PopCard, Button, ConfigProvider } from '@soui/ui';

export default () => (
  <ConfigProvider
    theme={{
      components: {
        PopCard: {
          colorBg: '#f0f5ff',
          borderRadius: 12,
          boxShadow: '0 8px 24px rgba(47, 84, 235, 0.2)',
        },
      },
    }}
  >
    <PopCard title="自定义主题" content="自定义背景、圆角与阴影。">
      <Button type="primary">悬停查看</Button>
    </PopCard>
  </ConfigProvider>
);
```

## API

### PopCard 属性

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| content | 卡片内容 | `ReactNode` | - |
| title | 卡片标题 | `ReactNode` | - |
| placement | 浮层位置 | `'top' \| 'topLeft' \| 'topRight' \| 'bottom' \| 'bottomLeft' \| 'bottomRight' \| 'left' \| 'leftTop' \| 'leftBottom' \| 'right' \| 'rightTop' \| 'rightBottom'` | `'top'` |
| trigger | 触发方式 | `'hover' \| 'click' \| 'focus' \| 'contextMenu'` 或其数组 | `'hover'` |
| open | 是否显示浮层（受控） | `boolean` | - |
| defaultOpen | 默认是否显示浮层 | `boolean` | `false` |
| disabled | 是否禁用 | `boolean` | `false` |
| destroyOnHidden | 隐藏时是否销毁浮层 | `boolean` | `true` |
| autoAdjustOverflow | 是否自动调整位置防止溢出 | `boolean` | `true` |
| arrow | 是否显示箭头 | `boolean` | `true` |
| zIndex | 层级 | `number` | `1030` |
| mouseEnterDelay | 鼠标移入延迟（秒） | `number` | `0.1` |
| mouseLeaveDelay | 鼠标移出延迟（秒） | `number` | `0.1` |
| overlayClassName | 浮层类名 | `string` | - |
| overlayStyle | 浮层样式 | `CSSProperties` | - |
| overlayInnerStyle | 浮层内部样式 | `CSSProperties` | - |
| getPopupContainer | 指定浮层挂载节点 | `(node: HTMLElement) => HTMLElement` | `document.body` |
| onOpenChange | 显示/隐藏回调 | `(open: boolean) => void` | - |

## 主题定制

PopCard 使用 `createPortal` 渲染在 ConfigProvider 的 DOM 树之外。组件通过 `useContext(ConfigContext)` 读取组件级主题配置（React Context 可跨 Portal 传递），并将配置注入为浮层根节点的 inline CSS 变量，从而实现主题同步。

### 组件级配置

通过 `theme.components.PopCard` 进行精细化配置：

```tsx
<ConfigProvider
  theme={{
    components: {
      PopCard: {
        colorBg: '#fff',
        borderRadius: 8,
        boxShadow: '0 6px 16px rgba(0, 0, 0, 0.08)',
      },
    },
  }}
>
  <App />
</ConfigProvider>
```

### 配置优先级

配置优先级从高到低：

1. **Props (overlayStyle/overlayClassName)** - 直接传入的样式属性
2. **组件级配置** - `theme.components.PopCard` 中的配置
3. **CSS 变量** - 全局 CSS 自定义属性
4. **Less 变量** - 默认值

### 可用的主题配置项

| 配置项 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| colorBg | 卡片背景色 | `string` | `@bg-color-container` |
| borderRadius | 圆角大小（像素） | `number` | `6` |
| boxShadow | 阴影 | `string` | 全局次级阴影 |

### 自定义 CSS 变量

也可以直接通过 `overlayStyle` 覆盖 CSS 变量：

```tsx
<PopCard
  title="标题"
  content="内容"
  overlayStyle={{
    '--soui-popcard-color-bg': '#fffbe6',
    '--soui-popcard-border-radius': '12px',
  }}
>
  <Button>悬停</Button>
</PopCard>
```

## 设计原则

- 内容保持精简，避免卡片过大遮挡页面
- 悬停触发适合信息预览，点击触发适合需要交互的内容
- 靠近视口边缘时自动调整方向，避免溢出

## 无障碍访问

- 浮层使用 `role="tooltip"`
- 支持 ESC 键关闭浮层
- 触发元素保留原生键盘可达性

## 相关资源

- [Tooltip 文字提示](/components/tooltip)
- [Card 卡片](/components/card)
