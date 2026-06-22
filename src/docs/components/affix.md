# Affix 固钉

将页面元素固定在特定可视区域位置。

## 何时使用

- 需要固定内容不随页面滚动，如导航栏、操作按钮等
- 在长页面中保持某些关键信息始终可见
- 注意：请确保固定的内容不会遮挡其他重要内容，特别是在小屏幕上

## 代码演示

### 基础用法

最简单的用法，支持 offsetTop 和 offsetBottom 两种模式。

```tsx
import { Affix, Button } from '@soui/ui';
import React from 'react';

export default () => {
  const [top, setTop] = React.useState(10);
  const [bottom, setBottom] = React.useState(10);

  return (
    <div style={{ height: 600, overflow: 'auto', border: '1px solid #d9d9d9', borderRadius: 6, padding: 16 }}>
      <div style={{ height: 200, background: '#f5f5f5', borderRadius: 4, padding: 16, marginBottom: 16 }}>
        <p style={{ margin: 0, color: '#666' }}>向下滚动查看效果 ↓</p>
      </div>

      <Affix offsetTop={top}>
        <Button type="primary" onClick={() => setTop(top + 10)}>
          Affix top - 固定在顶部 {top}px
        </Button>
      </Affix>

      <div style={{ height: 800, background: '#fafafa', borderRadius: 4, padding: 16, margin: '16px 0' }}>
        <p style={{ color: '#999' }}>长内容区域（800px）</p>
        <p style={{ color: '#ccc' }}>滚动时按钮会固定在顶部</p>
      </div>

      <Affix offsetBottom={bottom}>
        <Button type="primary" onClick={() => setBottom(bottom + 10)}>
          Affix bottom - 固定在底部 {bottom}px
        </Button>
      </Affix>

      <div style={{ height: 400, background: '#f5f5f5', borderRadius: 4, padding: 16, marginTop: 16 }}>
        <p style={{ color: '#999' }}>底部内容区域</p>
      </div>
    </div>
  );
};
```

### 指定容器

通过 `target` 属性可以指定 Affix 需要监听滚动事件的元素，而不是默认的 window。

```tsx
import { Affix, Button } from '@soui/ui';
import React from 'react';

export default () => {
  const [container, setContainer] = React.useState(null);

  return (
    <div
      ref={setContainer}
      style={{
        width: '100%',
        height: 100,
        overflow: 'auto',
        boxShadow: '0 0 0 1px #1677ff',
      }}
    >
      <div style={{ width: '100%', height: 1000 }}>
        <Affix offsetTop={20} target={() => container || window}>
          <Button type="primary">固定在容器顶部</Button>
        </Affix>
      </div>
    </div>
  );
};
```

### 回调函数

可以通过 `onChange` 获取到状态改变的情况。

```tsx
import { Affix, Button } from '@soui/ui';
import React from 'react';

export default () => {
  const [affixed, setAffixed] = React.useState(false);

  return (
    <Affix offsetTop={20} onChange={(state) => setAffixed(state)}>
      <Button type="primary">
        {affixed ? '已固定' : '未固定'}
      </Button>
    </Affix>
  );
};
```

## API

### 属性

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| offsetTop | 距离窗口顶部达到指定偏移量后触发（像素） | `number` | `0` | - |
| offsetBottom | 距离窗口底部达到指定偏移量后触发（像素） | `number` | - | - |
| target | 设置 Affix 需要监听其滚动事件的元素 | `() => HTMLElement \| Window` | `() => window` | - |
| onChange | 固定状态改变时的回调函数 | `(affixed: boolean) => void` | - | - |

## 主题定制

Affix 组件支持通过 ConfigProvider 进行主题定制。

**工作原理：** Affix 作为标准 React 组件渲染在 ConfigProvider 的 DOM 树内，通过 CSS 变量继承自动获取主题配置，无需额外桥接。

### 组件级配置

通过 `theme.components.Affix` 针对组件进行精细化配置：

```tsx
<ConfigProvider
  theme={{
    components: {
      Affix: {
        zIndex: 1050,
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
2. **组件级配置** - `theme.components.Affix` 中的配置
3. **CSS 变量** - 全局 CSS 自定义属性
4. **Less 变量** - 默认值

### 可用的主题配置项

| 配置项 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| zIndex | z-index 层级 | `number` | `1000` |

### 自定义 CSS 变量

对于更高级的定制需求，可以直接覆盖 CSS 变量：

```tsx
<Affix 
  style={{
    '--soui-affix-z-index': '1050',
  }}
/>
```

## FAQ

### 为什么我的固定元素会遮挡其他内容？

Affix 固定时会脱离文档流，可能导致遮挡下方内容。建议为被遮挡的内容添加适当的 margin 或 padding。

### offsetTop 和 offsetBottom 可以同时设置吗？

不建议同时设置。如果同时设置了 offsetTop 和 offsetBottom，offsetBottom 会优先生效。

### 如何防止在小屏幕上遮挡内容？

可以使用媒体查询或响应式逻辑，在小屏幕上禁用 affix 功能：

```tsx
const isMobile = window.innerWidth < 768;
{!isMobile && (
  <Affix offsetTop={20}>
    <YourContent />
  </Affix>
)}
```

## 相关资源

- [Anchor 锚点](/components/anchor)
