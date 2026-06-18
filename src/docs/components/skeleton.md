# Skeleton 占位符

在需要等待加载内容的位置提供一个占位组合。

## 何时使用

- 网络较慢，需要长时间等待加载处理的情况下
- 图文信息内容较多的列表/卡片中
- 只在第一次加载数据的时候使用
- 可以被 Loading 完全代替，但是在可用的场景下可以提供更好的视觉效果和用户体验

## 代码演示

### 基础用法

最简单的占位效果，可以配置标题和段落的行数。

```tsx
import { Skeleton } from '@soui/ui';

<div>
  <h4>基础占位</h4>
  <Skeleton />

  <h4>无标题</h4>
  <Skeleton title={false} paragraph={{ rows: 4 }} />

  <h4>小段落</h4>
  <Skeleton paragraph={{ rows: 2 }} />
</div>
```

### 动画效果

通过 `active` 属性展示动画效果，`round` 属性可以显示圆角。

```tsx
import { Skeleton } from '@soui/ui';

<div>
  <h4>带动画效果</h4>
  <Skeleton active />

  <h4>带动画 + 圆角</h4>
  <Skeleton active round />
</div>
```

### 复杂组合

可以配置头像、标题和段落的组合，支持自定义宽度和每行宽度。

```tsx
import { Skeleton } from '@soui/ui';

<div>
  <h4>带头像的占位</h4>
  <Skeleton avatar />

  <h4>方形头像</h4>
  <Skeleton avatar={{ shape: 'square', size: 'large' }} active />

  <h4>自定义标题宽度</h4>
  <Skeleton
    avatar
    title={{ width: '50%' }}
    paragraph={{ rows: 4, width: ['100%', '80%', '60%', '40%'] }}
    active
  />
</div>
```

### 子组件

Skeleton 提供了 `Avatar`、`Button`、`Input`、`Image` 子组件，可以灵活组合。

```tsx
import { Skeleton, Space } from '@soui/ui';

<div>
  <h4>按钮占位</h4>
  <Space size={16}>
    <Skeleton.Button size="small" />
    <Skeleton.Button />
    <Skeleton.Button size="large" />
    <Skeleton.Button shape="round" />
    <Skeleton.Button shape="circle" />
  </Space>

  <h4>头像占位</h4>
  <Space size={16}>
    <Skeleton.Avatar size="small" />
    <Skeleton.Avatar />
    <Skeleton.Avatar size="large" />
    <Skeleton.Avatar shape="square" />
  </Space>

  <h4>输入框占位</h4>
  <Space direction="vertical" size={16}>
    <Skeleton.Input size="small" />
    <Skeleton.Input />
    <Skeleton.Input size="large" />
  </Space>

  <h4>图片占位</h4>
  <Skeleton.Image />

  <h4>带动画效果</h4>
  <Space size={16}>
    <Skeleton.Button active />
    <Skeleton.Avatar active />
    <Skeleton.Input active />
    <Skeleton.Image active />
  </Space>
</div>
```

## API

### Skeleton

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `active` | 是否展示动画效果 | `boolean` | `false` |
| `loading` | 为 true 时显示占位图，反之则展示子组件 | `boolean` | - |
| `avatar` | 是否显示头像占位图 | `boolean \| SkeletonAvatarProps` | `false` |
| `title` | 是否显示标题占位图 | `boolean \| SkeletonTitleProps` | `true` |
| `paragraph` | 是否显示段落占位图 | `boolean \| SkeletonParagraphProps` | `true` |
| `round` | 为 true 时段落和标题显示圆角 | `boolean` | `false` |
| `className` | 自定义类名 | `string` | - |
| `style` | 自定义样式 | `React.CSSProperties` | - |

### SkeletonTitleProps

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `width` | 设置标题占位图的宽度 | `number \| string` | - |

### SkeletonParagraphProps

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `rows` | 设置段落占位图的行数 | `number` | `3` |
| `width` | 设置段落占位图的宽度，若为数组时则为对应的每行宽度，反之则是最后一行的宽度 | `number \| string \| Array<number \| string>` | - |

### Skeleton.Avatar

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `shape` | 指定头像的形状 | `'circle' \| 'square'` | `'circle'` |
| `size` | 设置头像占位图的大小 | `'small' \| 'default' \| 'large' \| number` | `'default'` |
| `active` | 是否展示动画效果 | `boolean` | `false` |

### Skeleton.Button

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `size` | 设置按钮的大小 | `'small' \| 'default' \| 'large'` | `'default'` |
| `shape` | 指定按钮的形状 | `'default' \| 'round' \| 'circle' \| 'square'` | `'default'` |
| `block` | 将按钮宽度调整为其父宽度的选项 | `boolean` | `false` |
| `active` | 是否展示动画效果 | `boolean` | `false` |

### Skeleton.Input

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `size` | 设置输入框的大小 | `'small' \| 'default' \| 'large'` | `'default'` |
| `active` | 是否展示动画效果 | `boolean` | `false` |

### Skeleton.Image

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `active` | 是否展示动画效果 | `boolean` | `false` |

## 主题定制

Skeleton 组件支持通过 ConfigProvider 进行主题定制，遵循 SoUi 三层设计令牌系统。

### 组件级配置

通过 `theme.components.Skeleton` 针对特定组件进行精细化配置：

```tsx
import { ConfigProvider } from '@soui/ui';

export default () => (
  <ConfigProvider
    theme={{
      components: {
        Skeleton: {
          // 组件专属配置项
          borderRadius: 6,              // 圆角大小
          colorBg: '#f5f5f5',           // 占位背景色
          colorHighlight: '#e8e8e8',    // 动画高亮色
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

### 可用的主题配置项

**颜色相关：**
- `colorBg` - 占位背景色
- `colorHighlight` - 动画高亮色

**尺寸相关：**
- `borderRadius` - 圆角大小（像素）

### 自定义 CSS 变量

对于更高级的定制需求，可以直接覆盖 CSS 变量：

```tsx
<Skeleton 
  style={{
    '--soui-skeleton-color-bg': '#e0e0e0',
    '--soui-skeleton-color-highlight': '#d0d0d0',
    '--soui-skeleton-border-radius': '8px',
  }}
/>
```

**CSS 变量命名规范：**
- 第2层（组件配置点）：`--soui-skeleton-{property}` - 带组件前缀的配置点
- 第3层（组件级覆盖）：`--soui-skeleton-{property}-component` - 带 `-component` 后缀的覆盖变量

## 无障碍访问

组件遵循 WAI-ARIA 规范：
- 骨架屏提供了视觉反馈，告知用户内容正在加载中
- 建议配合 `aria-busy="true"` 属性使用，增强可访问性

## FAQ

### 如何自定义每行段落的宽度？

使用 `paragraph.width` 属性传入数组：

```tsx
<Skeleton paragraph={{ rows: 4, width: ['100%', '80%', '60%', '40%'] }} />
```

### 如何控制加载状态的切换？

使用 `loading` 属性配合 `children`：

```tsx
<Skeleton loading={isLoading}>
  <div>实际内容</div>
</Skeleton>
```

### 如何让骨架屏显示圆角？

使用 `round` 属性：

```tsx
<Skeleton round />
```

### 子组件如何使用？

通过 `Skeleton.Avatar`、`Skeleton.Button`、`Skeleton.Input`、`Skeleton.Image` 灵活组合：

```tsx
<Space>
  <Skeleton.Avatar />
  <Skeleton.Button />
  <Skeleton.Input />
  <Skeleton.Image />
</Space>
```

## 相关资源

- [Loading 加载中](/components/loading)
