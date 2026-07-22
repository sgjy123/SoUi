# Badge 徽章数

图标右上角的圆形数字或状态点，用于提示待办数量或状态。

## 何时使用

- 需要提示未读消息、待办事项数量时
- 需要展示某个对象的状态（成功、进行中、错误等）时
- 需要在图标或头像上叠加醒目标记时

## 代码演示

### 基础用法

展示数字徽章，`showZero` 控制数值为 0 时是否展示，`count` 也可以是自定义内容。

```tsx
import { Badge, Icon, Space } from '@soui/ui';

export default () => (
  <Space size={32}>
    <Badge count={5}>
      <Icon name="Message" size={24} />
    </Badge>
    <Badge count={0} showZero>
      <Icon name="Mail" size={24} />
    </Badge>
    <Badge count={<Icon name="Time" size={14} fill="#fff" />}>
      <Icon name="Remind" size={24} />
    </Badge>
  </Space>
);
```

### 封顶数字

超过 `overflowCount` 时显示为 `${overflowCount}+`。

```tsx
import { Badge, Space } from '@soui/ui';

export default () => (
  <Space size={32}>
    <Badge count={99}>
      <span className="demo-box" />
    </Badge>
    <Badge count={100}>
      <span className="demo-box" />
    </Badge>
    <Badge count={1000} overflowCount={999}>
      <span className="demo-box" />
    </Badge>
  </Space>
);
```

### 小红点

`dot` 模式下不展示数字，只显示一个小红点。

```tsx
import { Badge, Icon, Space } from '@soui/ui';

export default () => (
  <Space size={32}>
    <Badge dot>
      <Icon name="Remind" size={24} />
    </Badge>
    <Badge dot>
      <a href="#">消息通知</a>
    </Badge>
  </Space>
);
```

### 状态点

五种预设状态，可配合 `text` 展示状态文字。

```tsx
import { Badge, Space } from '@soui/ui';

export default () => (
  <Space direction="vertical">
    <Badge status="success" text="Success" />
    <Badge status="error" text="Error" />
    <Badge status="default" text="Default" />
    <Badge status="processing" text="Processing" />
    <Badge status="warning" text="Warning" />
  </Space>
);
```

### 多彩颜色

`color` 支持预设颜色名和自定义色值。

```tsx
import { Badge, Space } from '@soui/ui';

export default () => (
  <Space direction="vertical">
    <Badge color="pink" text="pink" />
    <Badge color="green" text="green" />
    <Badge color="purple" text="purple" />
    <Badge color="#f50" text="#f50" />
    <Badge color="#2db7f5" text="#2db7f5" />
  </Space>
);
```

### 尺寸与描边

`size="small"` 展示小尺寸徽章，`bordered` 添加白色描边。

```tsx
import { Badge, Space } from '@soui/ui';

export default () => (
  <Space size={32}>
    <Badge count={5}>
      <span className="demo-box" />
    </Badge>
    <Badge count={5} size="small">
      <span className="demo-box" />
    </Badge>
    <Badge count={5} bordered>
      <span className="demo-box" />
    </Badge>
  </Space>
);
```

### 缎带

`Badge.Ribbon` 以缎带形式标注卡片。

```tsx
import { Badge, Card, Space } from '@soui/ui';

export default () => (
  <Space size={24} align="start">
    <Badge.Ribbon text="热门">
      <Card title="默认缎带" style={{ width: 220 }}>
        <p>缎带位于右上角。</p>
      </Card>
    </Badge.Ribbon>
    <Badge.Ribbon text="推荐" color="green" placement="start">
      <Card title="左侧缎带" style={{ width: 220 }}>
        <p>缎带位于左上角。</p>
      </Card>
    </Badge.Ribbon>
  </Space>
);
```

### 主题定制

通过 ConfigProvider 自定义徽章主题。

```tsx
import { Badge, ConfigProvider, Space } from '@soui/ui';

export default () => (
  <Space size={32}>
    <Badge count={5}>
      <span className="demo-box" />
    </Badge>
    <ConfigProvider
      theme={{
        components: {
          Badge: {
            colorError: '#722ed1',
            fontSize: 14,
          },
        },
      }}
    >
      <Badge count={5}>
        <span className="demo-box" />
      </Badge>
    </ConfigProvider>
  </Space>
);
```

## API

### Badge 属性

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| count | 展示的数字或内容 | `ReactNode` | - |
| dot | 不展示数字，只显示小红点 | `boolean` | `false` |
| overflowCount | 最大数值，超过显示为 `${overflowCount}+` | `number` | `99` |
| showZero | 数值为 0 时是否展示 | `boolean` | `false` |
| status | 状态点类型 | `'success' \| 'processing' \| 'default' \| 'error' \| 'warning'` | - |
| text | 状态点文字 | `ReactNode` | - |
| color | 自定义颜色（预设色名或色值） | `string` | - |
| size | 徽章尺寸 | `'default' \| 'small'` | `'default'` |
| offset | 位置偏移 `[水平, 垂直]` | `[number, number]` | - |
| title | 鼠标悬停提示文字 | `string` | - |
| bordered | 是否有白色描边 | `boolean` | `false` |

### Badge.Ribbon 属性

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| color | 缎带颜色（预设色名或色值） | `string` | `'red'` |
| placement | 缎带位置 | `'start' \| 'end'` | `'end'` |
| text | 缎带文字 | `ReactNode` | - |

### 预设颜色

`pink`、`red`、`yellow`、`orange`、`cyan`、`green`、`blue`、`purple`、`geekblue`、`magenta`、`volcano`、`gold`、`lime`

## 主题定制

Badge 作为标准 React 组件渲染在 ConfigProvider 的 DOM 树内，通过 CSS 变量继承自动获取主题配置，无需额外桥接。

### 组件级配置

通过 `theme.components.Badge` 进行精细化配置：

```tsx
<ConfigProvider
  theme={{
    components: {
      Badge: {
        colorError: '#ff4d4f',
        colorPrimary: '#1677ff',
        fontSize: 12,
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
2. **组件级配置** - `theme.components.Badge` 中的配置
3. **CSS 变量** - 全局 CSS 自定义属性
4. **Less 变量** - 默认值

### 可用的主题配置项

| 配置项 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| colorError | 错误色（数字背景色） | `string` | 全局 errorColor |
| colorPrimary | 主色（processing 状态色） | `string` | 全局 primaryColor |
| fontSize | 数字字体大小（像素） | `number` | `12` |

### 自定义 CSS 变量

也可以直接覆盖 CSS 变量实现更高级的定制：

```tsx
<Badge
  count={5}
  style={{
    '--soui-badge-color-error': '#fa8c16',
  }}
>
  <span className="demo-box" />
</Badge>
```

## 设计原则

- 数字徽章用于可量化的待办提示，状态点用于定性状态展示
- `overflowCount` 建议保持默认 99，避免数字过长影响布局
- 缎带适合标注卡片的营销属性（热门、新品），不建议用于常规状态

## 无障碍访问

- 数字徽章通过 `title` 提供悬停提示
- 状态点配合 `text` 文字，确保颜色信息有文本补充

## 相关资源

- [Tag 标签](/components/tag)
- [Card 卡片](/components/card)
