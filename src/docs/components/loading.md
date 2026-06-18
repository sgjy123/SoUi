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

### 全局配置

通过 `theme` 属性配置全局样式，影响所有使用该组件的实例：

```tsx
import { ConfigProvider } from '@soui/ui';

export default () => (
  <ConfigProvider
    theme={{
      // 全局配置项
      primaryColor: '#1677ff',     // 主色
      // ... 其他全局配置
    }}
  >
    <YourApp />
  </ConfigProvider>
);
```

### 组件级配置

通过 `theme.components.Loading` 针对特定组件进行精细化配置：

```tsx
import { ConfigProvider } from '@soui/ui';

export default () => (
  <ConfigProvider
    theme={{
      components: {
        Loading: {
          // 组件专属配置项
          colorPrimary: '#1677ff',    // 加载指示器颜色
          fontSize: 14,               // 文字大小
          dotSize: 20,                // 默认加载图标尺寸
          dotSizeSM: 14,              // 小号加载图标尺寸
          dotSizeLG: 32,              // 大号加载图标尺寸
        },
      },
    }}
  >
    <YourApp />
  </ConfigProvider>
);
```

### 配置优先级

SoUi 采用以下优先级规则（从高到低）：

```
Props 属性 > 组件级配置 > 全局配置 > CSS 变量 > Less 变量
```

**示例：**

```tsx
// 最高优先级：Props 直接设置
<Loading style={{ color: 'red' }} />

// 第二优先级：组件级配置
<ConfigProvider theme={{ components: { Loading: { colorPrimary: 'blue' } } }}>
  <YourApp /> {/* 使用蓝色 */}
</ConfigProvider>

// 第三优先级：全局配置
<ConfigProvider theme={{ primaryColor: 'green' }}>
  <YourApp /> {/* 使用绿色主色 */}
</ConfigProvider>
```

### 可用的主题配置项

**颜色相关：**
- `colorPrimary` - 加载指示器颜色

**尺寸相关：**
- `fontSize` - 文字大小（像素）
- `dotSize` - 默认加载图标尺寸（像素）
- `dotSizeSM` - 小号加载图标尺寸（像素）
- `dotSizeLG` - 大号加载图标尺寸（像素）

### 自定义 CSS 变量

对于更高级的定制需求，可以直接覆盖 CSS 变量：

```tsx
<Loading 
  style={{
    '--soui-loading-color-primary': '#ff0000',
    '--soui-loading-dot-size': '24px',
  }}
/>
```

**CSS 变量命名规范：**
- 第1层（设计令牌）：`--soui-primary-color` - 不带组件前缀的全局变量
- 第2层（组件配置点）：`--soui-loading-{property}` - 带组件前缀的配置点
- 第3层（组件级覆盖）：`--soui-loading-{property}-component` - 带 `-component` 后缀的覆盖变量

## 无障碍访问

组件遵循 WAI-ARIA 规范：
- 加载状态提供了视觉反馈，告知用户系统正在处理
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
