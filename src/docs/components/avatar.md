# Avatar 头像

头像，用于展示用户或事物的图片、图标或文字缩写。

## 何时使用

- 展示用户头像、账号信息时
- 在列表、评论区、头像组等场景代表一个主体时
- 需要用文字缩写或图标占位展示主体时

## 代码演示

### 基础用法

支持图片、图标、文字三种类型。文字过长时会自动缩放适配。

```tsx
import { Avatar, Icon } from '@soui/ui';

export default () => (
  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
    <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=Lily" />
    <Avatar icon={<Icon name="User" />} />
    <Avatar>U</Avatar>
    <Avatar style={{ background: '#1677ff' }}>USER</Avatar>
  </div>
);
```

### 形状

支持圆形（默认）和方形两种形状。

```tsx
import { Avatar, Icon } from '@soui/ui';

export default () => (
  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
    <Avatar shape="circle" icon={<Icon name="User" />} />
    <Avatar shape="square" icon={<Icon name="User" />} />
    <Avatar shape="square">U</Avatar>
  </div>
);
```

### 尺寸

支持 `large`、`middle`（默认）、`small` 预设尺寸，也可直接传入像素数值。

```tsx
import { Avatar, Icon } from '@soui/ui';

export default () => (
  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
    <Avatar size="large" icon={<Icon name="User" />} />
    <Avatar size="middle" icon={<Icon name="User" />} />
    <Avatar size="small" icon={<Icon name="User" />} />
    <Avatar size={64}>U</Avatar>
  </div>
);
```

### 头像组

使用 `Avatar.Group` 展示一组头像，`maxCount` 超出部分以 `+N` 收起。

```tsx
import { Avatar } from '@soui/ui';

const seeds = ['Lily', 'Leo', 'Mia', 'Tom', 'Amy', 'Jack'];

export default () => (
  <Avatar.Group maxCount={3} maxStyle={{ background: '#1677ff' }}>
    {seeds.map((s) => (
      <Avatar key={s} src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${s}`} />
    ))}
  </Avatar.Group>
);
```

### 加载失败回退

图片加载失败时回退到图标或文字。`onError` 返回 `false` 可阻止默认回退。

```tsx
import { Avatar } from '@soui/ui';

export default () => (
  <div style={{ display: 'flex', gap: 12 }}>
    <Avatar src="https://invalid.example.com/broken.png">FB</Avatar>
    <Avatar
      src="https://invalid.example.com/broken.png"
      onError={() => false}
    >
      FB
    </Avatar>
  </div>
);
```

## API

### Avatar 属性

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| shape | 头像形状 | `'circle' \| 'square'` | `'circle'` | - |
| size | 尺寸，预设值或像素数值 | `'large' \| 'middle' \| 'small' \| number` | `'middle'` | - |
| src | 图片头像地址 | `string` | - | - |
| srcSet | 图片 srcSet | `string` | - | - |
| alt | 图片 alt | `string` | - | - |
| icon | 图标头像 | `ReactNode` | - | - |
| gap | 文本与边框的左右间距 | `number` | `4` | - |
| onError | 图片加载失败回调，返回 false 阻止默认回退 | `() => boolean \| void` | - | - |

### Avatar.Group 属性

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| shape | 组内头像形状 | `'circle' \| 'square'` | `'circle'` | - |
| size | 组内头像尺寸 | `'large' \| 'middle' \| 'small' \| number` | `'middle'` | - |
| maxCount | 最多展示数量，超出以 +N 收起 | `number` | - | - |
| maxStyle | +N 收起头像的样式 | `CSSProperties` | - | - |
| maxPopoverPlacement | +N 收起头像弹出层位置 | `'top' \| 'bottom'` | `'top'` | - |

## 主题定制

Avatar 作为标准 React 组件渲染在 ConfigProvider 的 DOM 树内，通过 CSS 变量继承自动获取主题配置。

### 组件级配置

```tsx
<ConfigProvider
  theme={{
    components: {
      Avatar: {
        colorBg: '#1677ff',
        colorText: '#fff',
        borderRadius: 8,
      },
    },
  }}
>
  <Avatar>U</Avatar>
</ConfigProvider>
```

### 可用的主题配置项

| 配置项 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| colorBg | 默认背景色 | `string` | `#ccc` |
| colorText | 文本/图标颜色 | `string` | `#fff` |
| borderRadius | 方形头像圆角（像素） | `number` | 主题圆角 |
| groupBorderColor | 头像组内边框颜色 | `string` | `#fff` |

## 无障碍访问

- 图片头像建议传入 `alt` 描述
- 头像组收起项通过 `title` 提示隐藏数量

## 相关资源

- [Badge 徽章数](/components/badge)
- [Tag 标签](/components/tag)
