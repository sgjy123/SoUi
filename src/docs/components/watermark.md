# Watermark 水印

页面上添加水印，用于版权保护和信息溯源。

## 何时使用

- 页面内容需要版权保护，防止盗用
- 后台管理系统中标注操作者信息
- 敏感页面添加安全水印
- 文档或图片需要标注来源

## 代码演示

### 基础用法

最简单的文字水印。

```tsx
import { Watermark } from '@soui/ui';

export default () => (
  <Watermark content="SoUi Watermark" />
);
```

### 多行文本

支持通过 `\n` 换行显示多行水印。

```tsx
import { Watermark } from '@soui/ui';

export default () => (
  <Watermark content={'SoUi\nWatermark'} />
);
```

### 图片水印

使用图片作为水印内容。

```tsx
import { Watermark } from '@soui/ui';

export default () => (
  <Watermark
    image="https://gw.alipayobjects.com/zos/bmw-prod/59a18171-ae17-41d9-bbf3-fef0f6723923.svg"
    width={64}
    height={64}
  />
);
```

### 覆盖内容

将子元素作为水印覆盖层，水印不影响子元素的交互。

```tsx
import { Watermark } from '@soui/ui';

export default () => (
  <Watermark content="SoUi Watermark">
    <div style={{ padding: 24 }}>
      <h2>被水印覆盖的内容</h2>
      <p>水印会覆盖在内容上方，但不影响内容的交互。</p>
    </div>
  </Watermark>
);
```

### 自定义样式

自定义水印的颜色、大小、旋转角度、间距等。

```tsx
import { Watermark } from '@soui/ui';

export default () => (
  <Watermark
    content="SoUi Watermark"
    fontColor="rgba(255, 0, 0, 0.3)"
    fontSize={20}
    fontWeight="bold"
    rotate={-45}
    gapX={150}
    gapY={150}
    opacity={0.3}
  />
);
```

## API

### 属性

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| content | 水印文本内容，支持 `\n` 换行 | `string` | - | - |
| image | 水印图片 URL | `string` | - | - |
| width | 水印宽度 | `number` | `120` | - |
| height | 水印高度 | `number` | `64` | - |
| rotate | 水印旋转角度 | `number` | `-22` | - |
| gapX | 水印 X 轴间距 | `number` | `100` | - |
| gapY | 水印 Y 轴间距 | `number` | `100` | - |
| offsetLeft | 水印 X 轴偏移量 | `number` | `0` | - |
| offsetTop | 水印 Y 轴偏移量 | `number` | `0` | - |
| opacity | 水印透明度 | `number` | `0.15` | - |
| fontColor | 水印字体颜色 | `string` | `rgba(0, 0, 0, 0.85)` | - |
| fontSize | 水印字体大小 | `number` | `16` | - |
| fontWeight | 水印字体粗细 | `string \| number` | `normal` | - |
| fontFamily | 水印字体 | `string` | `sans-serif` | - |
| zIndex | 水印层级 | `number` | `9` | - |
| children | 子元素（水印将覆盖在子元素上方） | `ReactNode` | - | - |

## 主题定制

Watermark 作为标准 React 组件渲染在 ConfigProvider 的 DOM 树内，通过 CSS 变量继承自动获取主题配置。

### 组件级配置

通过 `theme.components.Watermark` 针对组件进行精细化配置：

```tsx
<ConfigProvider
  theme={{
    components: {
      Watermark: {
        fontColor: 'rgba(0, 0, 0, 0.5)',
        fontSize: 14,
        zIndex: 9,
      },
    },
  }}
>
  <YourApp />
</ConfigProvider>
```

### 配置优先级

配置优先级从高到低：

1. **Props** - 直接传入的属性
2. **组件级配置** - `theme.components.Watermark` 中的配置
3. **默认值** - 内置默认值

### 可用的主题配置项

| 配置项 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| fontColor | 水印字体颜色 | `string` | `rgba(0, 0, 0, 0.85)` |
| fontSize | 水印字体大小（像素） | `number` | `16` |
| zIndex | 水印层级 | `number` | `9` |

## 设计原则

### 推荐用法

```tsx
// 覆盖内容区域，不影响交互
<Watermark content="Confidential">
  <DataTable />
</Watermark>
```

### 避免使用

```tsx
// 避免设置过高透明度，影响内容可读性
<Watermark content="Watermark" opacity={0.8} />
```

## 无障碍访问

- 水印层设置 `pointer-events: none`，不会影响底层元素的鼠标事件
- 水印仅作视觉展示，不会被屏幕阅读器读取
- 水印内容可通过 DevTools 查看 DOM 结构获取

## 安全性说明

Watermark 组件内置了 `MutationObserver` 防护机制，当水印 DOM 元素被恶意删除或样式被篡改时，会自动重新创建水印。这一机制可以防止通过浏览器 DevTools 直接移除水印。

需要注意的是，前端水印本质上是一种视觉提示，无法做到 100% 防篡改。对于高安全性场景，建议结合服务端水印（在图片/文档生成时嵌入）一起使用。

## FAQ

### 文字水印和图片水印能同时使用吗？

不能同时使用。当设置了 `image` 属性时，组件会优先使用图片水印；只有当 `image` 为空时才会使用 `content` 渲染文字水印。

### 水印会影响页面性能吗？

水印使用 Canvas 生成 base64 图片作为背景，并通过 CSS `background-repeat` 平铺。对于大面积页面，建议适当增大 `gapX` 和 `gapY` 以减少水印密度，降低渲染压力。

### 如何防止水印被移除？

组件内置了 `MutationObserver` 防护，当检测到水印 DOM 被删除或样式被修改时会自动重建。但请注意，这仅是前端层面的防护，无法完全阻止有经验的用户通过禁用 JavaScript 等方式移除水印。

## 相关资源

- [ConfigProvider](/components/config-provider) - 全局主题配置
