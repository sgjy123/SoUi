# Image 图片

展示图片，支持预览大图、加载失败占位和懒加载。

## 何时使用

- 需要展示单张或多张图片时
- 需要图片点击预览大图时
- 需要处理图片加载失败的回退展示时

## 代码演示

### 基础用法

基础图片展示，悬停显示预览遮罩，点击打开预览。

```tsx
import { Image } from '@soui/ui';

export default () => (
  <Image src="https://picsum.photos/200/200" width={200} height={200} alt="示例" />
);
```

### 加载失败

`fallback` 配置图片加载失败时的占位图。

```tsx
import { Image } from '@soui/ui';

export default () => (
  <Image
    src="https://invalid-url.example/broken.png"
    fallback="https://picsum.photos/200/200"
    width={200}
    height={200}
  />
);
```

### 多张图片预览

`Image.PreviewGroup` 包裹多张图片，支持左右切换预览。

```tsx
import { Image, Space } from '@soui/ui';

export default () => (
  <Image.PreviewGroup>
    <Space size={16}>
      <Image src="https://picsum.photos/200/200?random=1" width={120} height={120} />
      <Image src="https://picsum.photos/200/200?random=2" width={120} height={120} />
      <Image src="https://picsum.photos/200/200?random=3" width={120} height={120} />
    </Space>
  </Image.PreviewGroup>
);
```

### 主题定制

通过 ConfigProvider 自定义图片主题。

```tsx
import { Image, ConfigProvider } from '@soui/ui';

export default () => (
  <ConfigProvider
    theme={{
      components: {
        Image: {
          borderRadius: 16,
          placeholderBg: '#f0f5ff',
        },
      },
    }}
  >
    <Image src="https://picsum.photos/200/200" width={200} height={200} placeholder="加载中..." />
  </ConfigProvider>
);
```

## API

### Image 属性

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| src | 图片地址 | `string` | - |
| alt | 替代文本 | `string` | - |
| width | 宽度 | `string \| number` | - |
| height | 高度 | `string \| number` | - |
| fallback | 加载失败时的占位图地址 | `string` | - |
| placeholder | 加载中占位内容 | `ReactNode` | - |
| preview | 预览配置，false 关闭预览 | `boolean \| ImagePreviewProps` | `true` |

### ImagePreviewProps

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| visible | 受控显示状态 | `boolean` | - |
| defaultVisible | 默认显示状态 | `boolean` | `false` |
| onVisibleChange | 显示/隐藏回调 | `(visible: boolean) => void` | - |
| src | 自定义预览图片 | `string` | - |
| mask | 遮罩内容，false 关闭默认遮罩 | `ReactNode \| false` | - |
| maskClassName | 遮罩自定义类名 | `string` | - |
| closeIcon | 关闭图标 | `ReactNode` | - |

### Image.PreviewGroup 属性

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| preview | 预览配置 | `ImagePreviewProps` | - |

## 主题定制

Image 作为标准 React 组件渲染在 ConfigProvider 的 DOM 树内，通过 CSS 变量继承自动获取主题配置。预览弹层通过 Portal 渲染到 document.body，主题色通过全局变量继承（不依赖 ConfigProvider 的 DOM 包裹）。

### 组件级配置

通过 `theme.components.Image` 进行精细化配置：

```tsx
<ConfigProvider
  theme={{
    components: {
      Image: {
        placeholderBg: '#f5f5f5',
        borderRadius: 8,
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
2. **组件级配置** - `theme.components.Image` 中的配置
3. **CSS 变量** - 全局 CSS 自定义属性
4. **Less 变量** - 默认值

### 可用的主题配置项

| 配置项 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| placeholderBg | 占位背景色 | `string` | `@bg-color-layout` |
| borderRadius | 圆角大小（像素） | `number` | `6` |

### 自定义 CSS 变量

也可以直接覆盖 CSS 变量：

```tsx
<Image
  src="..."
  style={{
    '--soui-image-border-radius': '12px',
  }}
/>
```

## 设计原则

- 预览遮罩悬停时渐显，避免遮挡图片本身
- 多张图片使用 `PreviewGroup` 包裹，支持左右切换
- `fallback` 应使用与目标尺寸一致的占位图

## 无障碍访问

- 预览遮罩提供 `aria-label`（预览图片）
- 关闭按钮 `aria-label="关闭"`
- 上一张/下一张导航 `aria-label`（上一张/下一张）
- 支持键盘：ESC 关闭，← → 切换图片

## 相关资源

- [Carousel 轮播](/components/carousel)
- [Empty 空状态](/components/empty)
