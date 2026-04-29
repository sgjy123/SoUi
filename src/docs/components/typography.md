# Typography 排版

用于展示标题、段落、列表等文本内容，提供丰富的文本样式和交互功能。

## 何时使用

- 需要展示不同层级的标题文本
- 需要展示正文段落内容
- 需要对文本进行特殊标记（删除线、下划线、代码等）
- 需要文本的复制、编辑功能
- 需要文本溢出省略显示

## 代码演示

### 基础用法

Typography 组件包含 Title、Paragraph、Text、Link 四个子组件。

```tsx
import { Typography, Space } from '@soui/ui';

const { Title, Paragraph, Text, Link } = Typography;

export default () => (
  <Space direction="vertical" style={{ width: '100%' }}>
    <Title level={1}>一级标题</Title>
    <Title level={2}>二级标题</Title>
    <Title level={3}>三级标题</Title>
    <Title level={4}>四级标题</Title>
    <Title level={5}>五级标题</Title>
    <Paragraph>这是一个段落，用于展示正文内容的样式。</Paragraph>
    <Text>普通文本</Text>
    <br />
    <Link href="https://example.com">链接文本</Link>
  </Space>
);
```

### 文本样式

通过属性设置文本的各种装饰效果。

```tsx
import { Typography, Space } from '@soui/ui';

const { Text } = Typography;

export default () => (
  <Space direction="vertical" size="middle">
    <div>
      <Text strong>加粗文本</Text>
    </div>
    <div>
      <Text italic>斜体文本</Text>
    </div>
    <div>
      <Text underline>下划线文本</Text>
    </div>
    <div>
      <Text delete>删除线文本</Text>
    </div>
    <div>
      <Text code>代码文本</Text>
    </div>
    <div>
      <Text mark>高亮文本</Text>
    </div>
    <div>
      <Text disabled>禁用文本</Text>
    </div>
  </Space>
);
```

### 组合样式

可以同时应用多种文本样式。

```tsx
import { Typography, Space } from '@soui/ui';

const { Text } = Typography;

export default () => (
  <Space direction="vertical" size="middle">
    <div>
      <Text strong underline>加粗且带下划线</Text>
    </div>
    <div>
      <Text italic delete>斜体且带删除线</Text>
    </div>
    <div>
      <Text strong code>加粗的代码文本</Text>
    </div>
    <div>
      <Text mark strong>高亮且加粗</Text>
    </div>
  </Space>
);
```

### 文本类型

Text 组件支持不同的语义类型。

```tsx
import { Typography, Space } from '@soui/ui';

const { Text } = Typography;

export default () => (
  <Space direction="vertical" size="middle">
    <div>
      <Text type="secondary">次要文本</Text>
    </div>
    <div>
      <Text type="success">成功文本</Text>
    </div>
    <div>
      <Text type="warning">警告文本</Text>
    </div>
    <div>
      <Text type="danger">危险文本</Text>
    </div>
  </Space>
);
```

### 可复制文本

通过 copyable 属性启用文本复制功能。

```tsx
import { Typography, Space } from '@soui/ui';

const { Text, Paragraph } = Typography;

export default () => (
  <Space direction="vertical" style={{ width: '100%' }}>
    <div>
      <Text copyable>这段文字可以点击复制</Text>
    </div>
    <div>
      <Text
        copyable={{
          text: '自定义复制内容',
          tooltips: ['点击复制', '已复制'],
        }}
      >
        自定义复制内容
      </Text>
    </div>
    <Paragraph copyable>
      段落也可以支持复制功能，点击右侧的复制图标即可复制整段内容。
    </Paragraph>
  </Space>
);
```

### 可编辑文本

通过 editable 属性启用文本编辑功能。

```tsx
import { Typography, Space, Message } from '@soui/ui';

const { Text, Paragraph } = Typography;

export default () => (
  <Space direction="vertical" style={{ width: '100%' }}>
    <div>
      <Text
        editable={{
          onChange: (value) => Message.info(`新值: ${value}`),
        }}
      >
        点击编辑图标可以修改这段文字
      </Text>
    </div>
    <Paragraph
      editable={{
        onFinish: (value) => Message.success(`保存成功: ${value}`),
        onCancel: () => Message.warning('取消编辑'),
      }}
    >
      段落也支持编辑功能，点击编辑图标后可以直接修改内容，按回车或点击确认按钮保存。
    </Paragraph>
  </Space>
);
```

### 文本省略

通过 ellipsis 属性实现文本溢出省略。

```tsx
import { Typography, Space } from '@soui/ui';

const { Paragraph, Text } = Typography;

const longText = '这是一段很长的文本内容，用于演示文本溢出时的省略效果。当文本超过指定行数时，会自动显示省略号，并且可以提供展开功能来查看完整内容。';

export default () => (
  <Space direction="vertical" style={{ width: '100%' }}>
    <Paragraph ellipsis>
      {longText}
    </Paragraph>
    <Paragraph ellipsis={{ rows: 2 }}>
      {longText + longText}
    </Paragraph>
    <Paragraph
      ellipsis={{
        rows: 2,
        expandable: true,
        symbol: '更多',
      }}
    >
      {longText + longText}
    </Paragraph>
    <Text ellipsis={{ tooltip: longText }}>
      {longText}
    </Text>
  </Space>
);
```

### 链接组件

Link 组件用于展示可点击的链接。

```tsx
import { Typography, Space } from '@soui/ui';

const { Link } = Typography;

export default () => (
  <Space direction="vertical" size="middle">
    <div>
      <Link href="https://example.com">默认链接</Link>
    </div>
    <div>
      <Link href="https://example.com" target="_blank">
        新窗口打开
      </Link>
    </div>
    <div>
      <Link href="#" disabled>
        禁用链接
      </Link>
    </div>
  </Space>
);
```

### 完整示例

综合运用各种 Typography 组件创建一个完整的文章结构。

```tsx
import { Typography, Space } from '@soui/ui';

const { Title, Paragraph, Text, Link } = Typography;

export default () => (
  <div style={{ maxWidth: 800, margin: '0 auto' }}>
    <Title level={1}>React 开发指南</Title>
    <Paragraph>
      <Text type="secondary">作者：张三 | 发布日期：2024-01-01</Text>
    </Paragraph>

    <Title level={2}>简介</Title>
    <Paragraph>
      React 是一个用于构建用户界面的 JavaScript 库。它由 Facebook 开发并维护，
      广泛应用于现代 Web 开发中。React 采用组件化架构，让开发者可以构建复杂
      的用户界面。
    </Paragraph>

    <Title level={2}>核心特性</Title>
    <Paragraph>
      <Text strong>声明式编程：</Text>
      React 使创建交互式 UI 变得轻而易举。为你应用的每一个状态设计简洁的视图，
      当数据改变时，React 将高效地更新和渲染正确的组件。
    </Paragraph>
    <Paragraph>
      <Text strong>组件化：</Text>
      构建管理自身状态的封装组件，然后将其组合以构建复杂的 UI。由于组件逻辑
      使用 JavaScript 编写而非模板，因此你可以轻松地在应用中传递数据。
    </Paragraph>

    <Title level={2}>学习资源</Title>
    <Paragraph>
      想要深入学习 React？请访问{' '}
      <Link href="https://react.dev" target="_blank">
        React 官方文档
      </Link>
      {' '}获取更多教程和最佳实践。
    </Paragraph>

    <Paragraph>
      <Text type="secondary" italic>
        本文最后更新于 2024 年 1 月，部分内容可能已过时，请以官方文档为准。
      </Text>
    </Paragraph>
  </div>
);
```

## API

### Typography.Title

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| level | 标题级别 | `1 \| 2 \| 3 \| 4 \| 5` | `1` | - |
| disabled | 是否禁用 | `boolean` | `false` | - |
| mark | 是否添加标记样式 | `boolean` | `false` | - |
| code | 是否添加代码样式 | `boolean` | `false` | - |
| underline | 是否添加下划线 | `boolean` | `false` | - |
| delete | 是否添加删除线 | `boolean` | `false` | - |
| strong | 是否加粗 | `boolean` | `false` | - |
| italic | 是否斜体 | `boolean` | `false` | - |
| copyable | 是否可复制 | `boolean \| CopyConfig` | `false` | - |
| editable | 是否可编辑 | `boolean \| EditableConfig` | `false` | - |
| ellipsis | 是否省略显示 | `boolean \| EllipsisConfig` | `false` | - |

### Typography.Paragraph

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| disabled | 是否禁用 | `boolean` | `false` | - |
| mark | 是否添加标记样式 | `boolean` | `false` | - |
| code | 是否添加代码样式 | `boolean` | `false` | - |
| underline | 是否添加下划线 | `boolean` | `false` | - |
| delete | 是否添加删除线 | `boolean` | `false` | - |
| strong | 是否加粗 | `boolean` | `false` | - |
| italic | 是否斜体 | `boolean` | `false` | - |
| copyable | 是否可复制 | `boolean \| CopyConfig` | `false` | - |
| editable | 是否可编辑 | `boolean \| EditableConfig` | `false` | - |
| ellipsis | 是否省略显示 | `boolean \| EllipsisConfig` | `false` | - |

### Typography.Text

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| type | 文本类型 | `'secondary' \| 'success' \| 'warning' \| 'danger'` | - | - |
| disabled | 是否禁用 | `boolean` | `false` | - |
| mark | 是否添加标记样式 | `boolean` | `false` | - |
| code | 是否添加代码样式 | `boolean` | `false` | - |
| underline | 是否添加下划线 | `boolean` | `false` | - |
| delete | 是否添加删除线 | `boolean` | `false` | - |
| strong | 是否加粗 | `boolean` | `false` | - |
| italic | 是否斜体 | `boolean` | `false` | - |
| copyable | 是否可复制 | `boolean \| CopyConfig` | `false` | - |
| editable | 是否可编辑 | `boolean \| EditableConfig` | `false` | - |
| ellipsis | 是否省略显示 | `boolean \| EllipsisConfig` | `false` | - |

### Typography.Link

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| href | 链接地址 | `string` | - | - |
| target | 打开方式 | `string` | - | - |
| rel | rel 属性 | `string` | - | - |
| disabled | 是否禁用 | `boolean` | `false` | - |
| underline | 是否添加下划线 | `boolean` | `true` | - |
| 其他属性 | 同 Text | - | - | - |

### CopyConfig

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| text | 复制的文本内容 | `string` | 组件内容 | - |
| onCopy | 复制回调 | `(event: MouseEvent) => void` | - | - |
| icon | 自定义复制图标 | `ReactNode` | 默认图标 | - |
| tooltips | 提示文本 | `boolean \| string` | `true` | - |

### EditableConfig

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| editing | 是否处于编辑状态 | `boolean` | `false` | - |
| onStart | 开始编辑回调 | `() => void` | - | - |
| onChange | 内容变化回调 | `(value: string) => void` | - | - |
| onCancel | 取消编辑回调 | `() => void` | - | - |
| onFinish | 完成编辑回调 | `(value: string) => void` | - | - |
| triggerType | 触发方式 | `('icon' \| 'text')[]` | `['icon']` | - |
| icon | 自定义编辑图标 | `ReactNode` | 默认图标 | - |
| tooltip | 提示文本 | `boolean \| string` | `'编辑'` | - |

### EllipsisConfig

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| rows | 最大行数 | `number` | `1` | - |
| expandable | 是否可展开 | `boolean` | `false` | - |
| suffix | 省略后缀 | `string` | - | - |
| symbol | 展开按钮文案 | `ReactNode` | `'展开'` | - |
| onExpand | 展开回调 | `(e: MouseEvent) => void` | - | - |
| onEllipsis | 省略状态变化回调 | `(ellipsis: boolean) => void` | - | - |
| tooltip | 悬浮提示内容 | `boolean \| string` | `false` | - |

## 设计原则

### ✅ 推荐用法

```tsx
// 1. 使用语义化的标题层级
<Title level={1}>页面主标题</Title>
<Title level={2}>章节标题</Title>
<Title level={3}>小节标题</Title>

// 2. 合理使用文本样式
<Text strong>重要信息</Text>
<Text type="secondary">辅助说明</Text>
<Text type="danger">错误提示</Text>

// 3. 长文本使用省略
<Paragraph ellipsis={{ rows: 3, expandable: true }}>
  {longContent}
</Paragraph>

// 4. 链接添加 target 和 rel
<Link href="https://example.com" target="_blank" rel="noopener noreferrer">
  外部链接
</Link>
```

### ❌ 避免使用

```tsx
// 1. 避免跳过标题层级
<Title level={1}>主标题</Title>
<Title level={3}>直接跳到三级</Title> // ❌ 应该用 level={2}

// 2. 避免过度使用文本样式
<Text strong underline delete italic>
  太多样式混合
</Text> // ❌ 保持简洁

// 3. 避免在短文本上使用省略
<Text ellipsis>短文本</Text> // ❌ 没有必要

// 4. 避免禁用的链接没有说明
<Link href="#" disabled>
  不可点击
</Link> // ❌ 应该提供替代方案或说明
```

## 无障碍访问

Typography 组件遵循 WAI-ARIA 规范：

- 标题组件使用正确的 `<h1>` - `<h5>` 标签
- 链接组件支持键盘导航
- 禁用状态添加 `aria-disabled` 属性
- 可编辑文本支持键盘操作（Enter 保存，Escape 取消）

```tsx
// 标题层级应该有序
<Title level={1}>主标题</Title>
<Title level={2}>副标题</Title>

// 链接在新窗口打开时应该提示用户
<Link href="..." target="_blank" rel="noopener noreferrer">
  外部链接 <span className="sr-only">（在新窗口打开）</span>
</Link>
```

## FAQ

### 如何实现多行省略？

```tsx
<Paragraph ellipsis={{ rows: 3 }}>
  {longText}
</Paragraph>
```

### 如何自定义复制图标？

```tsx
<Text
  copyable={{
    icon: <CustomIcon />,
    tooltips: ['点击复制', '复制成功'],
  }}
>
  可复制文本
</Text>
```

### 如何控制编辑状态？

```tsx
const [editing, setEditing] = useState(false);

<Text
  editable={{
    editing,
    onStart: () => setEditing(true),
    onFinish: (value) => {
      console.log(value);
      setEditing(false);
    },
    onCancel: () => setEditing(false),
  }}
>
  可编辑文本
</Text>
```

### 省略时如何显示 Tooltip？

```tsx
<Text ellipsis={{ tooltip: '完整的文本内容' }}>
  可能被省略的文本
</Text>
```

### 如何自定义展开按钮？

```tsx
<Paragraph
  ellipsis={{
    rows: 2,
    expandable: true,
    symbol: '查看更多',
  }}
>
  {longText}
</Paragraph>
```

## 相关资源

- [Button 按钮](/components/button) - 可与文本配合使用
- [Icon 图标](/components/icon) - 自定义复制和编辑图标
- [Space 间距](/components/space) - 控制文本组件间距
