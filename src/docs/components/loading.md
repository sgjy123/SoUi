# Loading 加载中

用于页面和区块的加载中状态。

## 何时使用

- 页面局部处于等待状态，例如数据加载中
- 需要提示用户等待，避免用户因界面无响应而重复操作
- 包裹内容区域，表示内容正在加载中

## 代码演示

### 基础用法

三种尺寸的加载指示器：`small`、`default`、`large`。

```tsx
import { Loading, Space } from '@soui/ui';

<Space size={40}>
  <div style={{ textAlign: 'center' }}>
    <Loading size="small" />
    <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>Small</div>
  </div>
  <div style={{ textAlign: 'center' }}>
    <Loading />
    <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>Default</div>
  </div>
  <div style={{ textAlign: 'center' }}>
    <Loading size="large" />
    <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>Large</div>
  </div>
</Space>
```

### 包裹内容

将内容包裹在 Loading 中，当加载状态激活时，内容会被模糊化并显示加载指示器。

```tsx
import { useState } from 'react';
import { Loading, Button, Space } from '@soui/ui';

export default () => {
  const [loading, setLoading] = useState(false);

  return (
    <Space direction="vertical" size={16}>
      <Button onClick={() => setLoading(!loading)} type="primary">
        {loading ? '停止加载' : '开始加载'}
      </Button>
      <Loading spinning={loading} tip="加载中...">
        <div style={{ padding: 24, background: '#f5f5f5', borderRadius: 6 }}>
          <h3 style={{ marginBottom: 12 }}>卡片标题</h3>
          <p>这是一段内容，当加载状态激活时，内容会被模糊化。</p>
        </div>
      </Loading>
    </Space>
  );
};
```

### 自定义指示器

通过 `indicator` 属性自定义加载指示器，通过 `tip` 属性添加描述文案。

```tsx
import { Loading, Space, Icon } from '@soui/ui';

<Space size={40}>
  <div style={{ textAlign: 'center' }}>
    <Loading tip="加载中..." />
  </div>
  <div style={{ textAlign: 'center' }}>
    <Loading
      indicator={<Icon name="LoadingThree" size={24} fill="#1677ff" />}
      tip="自定义图标"
    />
  </div>
  <div style={{ textAlign: 'center' }}>
    <Loading size="large" tip="正在加载数据..." />
  </div>
</Space>
```

## API

### 属性

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `spinning` | 是否为加载中状态 | `boolean` | `true` |
| `size` | 组件大小 | `'small' \| 'default' \| 'large'` | `'default'` |
| `tip` | 自定义描述文案 | `React.ReactNode` | - |
| `indicator` | 自定义加载指示器 | `React.ReactNode` | - |
| `delay` | 延迟显示加载效果的时间（毫秒），避免闪烁 | `number` | - |
| `wrapperClassName` | 包装器的类属性 | `string` | - |
| `className` | 自定义类名 | `string` | - |
| `style` | 自定义样式 | `React.CSSProperties` | - |
| `children` | 子元素（包裹模式） | `React.ReactNode` | - |

## 主题定制

Loading 组件支持通过 ConfigProvider 进行主题定制，遵循 SoUi 三层设计令牌系统。

Loading 作为标准 React 组件渲染在 ConfigProvider 的 DOM 树内，通过 CSS 变量继承自动获取主题配置，无需额外桥接。

### 组件级配置

通过 `theme.components.Loading` 针对 Loading 组件进行精细化配置：

```tsx
import { ConfigProvider } from '@soui/ui';

export default () => (
  <ConfigProvider
    theme={{
      components: {
        Loading: {
          colorPrimary: '#1677ff',
          fontSize: 14,
          dotSize: 20,
          dotSizeSM: 14,
          dotSizeLG: 32,
        },
      },
    }}
  >
    <YourApp />
  </ConfigProvider>
);
```

### 配置优先级

配置优先级从高到低：

1. **Props (style/className)** - 直接传入的样式属性
2. **组件级配置** - `theme.components.Loading` 中的配置
3. **CSS 变量** - 全局 CSS 自定义属性
4. **Less 变量** - 默认值

### 可用的主题配置项

| 配置项 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| colorPrimary | 加载指示器颜色 | `string` | `#1677ff` |
| fontSize | 文字大小（像素） | `number` | `14` |
| dotSize | 默认加载图标尺寸（像素） | `number` | `20` |
| dotSizeSM | 小号加载图标尺寸（像素） | `number` | `14` |
| dotSizeLG | 大号加载图标尺寸（像素） | `number` | `32` |

### 自定义 CSS 变量

对于更高级的定制需求，可以直接覆盖 CSS 变量：

```tsx
<Loading 
  style={{
    '--soui-loading-color-primary': '#ff0000',
    '--soui-loading-dot-size': '24px',
    '--soui-loading-overlay-bg': 'rgba(0, 0, 0, 0.3)',
  }}
/>
```

可用的 CSS 变量包括：`--soui-loading-color-primary`、`--soui-loading-font-size`、`--soui-loading-dot-size`、`--soui-loading-dot-size-sm`、`--soui-loading-dot-size-lg`、`--soui-loading-z-index`、`--soui-loading-border-radius`、`--soui-loading-overlay-bg`。

## 无障碍访问

组件遵循 WAI-ARIA 规范：

- 加载指示器使用 `role="status"` 和 `aria-live="polite"` 属性，屏幕阅读器会自动播报加载状态变化
- 未提供 `tip` 时，组件默认使用 `aria-label="加载中"` 作为无障碍标签
- 提供 `tip` 时，tip 文本作为可播报内容（tip 容器标记 `aria-hidden="true"` 避免重复播报）
- 包裹模式下，外层容器设置 `aria-busy` 属性反映加载状态
- 建议配合 `tip` 属性提供文字说明，增强可访问性

## FAQ

### 如何延迟显示 Loading？

使用 `delay` 属性可以避免快速加载时 Loading 闪烁：

```tsx
<Loading delay={300}>
  <Content />
</Loading>
```

### 如何自定义加载指示器？

使用 `indicator` 属性传入自定义 React 节点：

```tsx
<Loading indicator={<Icon name="LoadingThree" size={24} />}>
  <Content />
</Loading>
```

### 如何隐藏默认的加载指示器？

将 `indicator` 设置为 `null`：

```tsx
<Loading indicator={null} tip="加载中..." />
```

### 包裹模式下如何控制加载状态？

使用 `spinning` 属性控制：

```tsx
<Loading spinning={isLoading} tip="数据加载中...">
  <Table dataSource={data} />
</Loading>
```

## 相关资源

- [Message 全局提示](/components/message)
- [Progress 进度条](/components/progress)
