# Tag 标签

进行标记和分类的小标签，便于用户快速识别事物属性。

## 何时使用

- 用于标记事物的属性和维度
- 对一组内容进行分类归纳
- 需要可关闭、可选择的交互标签时

## 代码演示

### 基础用法

基本标签，可通过 `bordered={false}` 去除边框。

```tsx
import { Tag } from '@soui/ui';

export default () => (
  <>
    <Tag>默认标签</Tag>
    <Tag bordered={false}>无边框</Tag>
  </>
);
```

### 多彩标签

支持预设状态色、11 种预设颜色和任意自定义色值。

```tsx
import { Tag, Space } from '@soui/ui';

export default () => (
  <Space wrap>
    <Tag color="success">成功</Tag>
    <Tag color="processing">进行中</Tag>
    <Tag color="error">错误</Tag>
    <Tag color="warning">警告</Tag>
    <Tag color="magenta">magenta</Tag>
    <Tag color="blue">blue</Tag>
    <Tag color="purple">purple</Tag>
    <Tag color="#f50">#f50</Tag>
  </Space>
);
```

### 可关闭标签

设置 `closable` 显示关闭按钮，`onClose` 回调中调用 `e.preventDefault()` 可阻止关闭。

```tsx
import React, { useState } from 'react';
import { Tag, Space } from '@soui/ui';

export default () => {
  const [tags, setTags] = useState(['电影', '书籍', '音乐']);

  return (
    <Space>
      {tags.map((tag) => (
        <Tag key={tag} closable onClose={() => setTags(tags.filter((t) => t !== tag))}>
          {tag}
        </Tag>
      ))}
    </Space>
  );
};
```

### 可选中标签

`Tag.CheckableTag` 用于多选场景，配合 `checked` 和 `onChange` 使用。

```tsx
import React, { useState } from 'react';
import { Tag, Space } from '@soui/ui';

const { CheckableTag } = Tag;

export default () => {
  const [selected, setSelected] = useState(['美食']);

  return (
    <Space>
      {['美食', '旅行', '摄影'].map((tag) => (
        <CheckableTag
          key={tag}
          checked={selected.includes(tag)}
          onChange={(checked) =>
            setSelected(checked ? [...selected, tag] : selected.filter((t) => t !== tag))
          }
        >
          {tag}
        </CheckableTag>
      ))}
    </Space>
  );
};
```

### 图标标签

通过 `icon` 属性为标签添加图标。

```tsx
import { Tag, Icon, Space } from '@soui/ui';

export default () => (
  <Space>
    <Tag icon={<Icon name="Github" size={12} />}>GitHub</Tag>
    <Tag icon={<Icon name="CheckOne" size={12} />} color="success">已完成</Tag>
  </Space>
);
```

### 主题定制

通过 ConfigProvider 自定义标签主题。

```tsx
import { Tag, ConfigProvider, Space } from '@soui/ui';

export default () => (
  <ConfigProvider
    theme={{
      primaryColor: '#722ed1',
      components: {
        Tag: {
          borderRadius: 11,
          defaultBg: '#f9f0ff',
          defaultColor: '#722ed1',
          defaultBorderColor: '#d3adf7',
        },
      },
    }}
  >
    <Space>
      <Tag>紫色胶囊标签</Tag>
      <Tag.CheckableTag checked>选中</Tag.CheckableTag>
    </Space>
  </ConfigProvider>
);
```

## API

### Tag 属性

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| color | 标签颜色：预设状态色、预设颜色或自定义色值 | `'success' \| 'processing' \| 'error' \| 'default' \| 'warning' \| 'magenta' \| 'red' \| 'volcano' \| 'orange' \| 'gold' \| 'lime' \| 'green' \| 'cyan' \| 'blue' \| 'geekblue' \| 'purple' \| string` | - |
| closable | 是否可关闭 | `boolean` | `false` |
| closeIcon | 自定义关闭图标 | `ReactNode` | - |
| onClose | 关闭时的回调，`e.preventDefault()` 可阻止关闭 | `(e: MouseEvent) => void` | - |
| icon | 标签内的图标 | `ReactNode` | - |
| bordered | 是否有边框 | `boolean` | `true` |

### Tag.CheckableTag 属性

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| checked | 是否选中 | `boolean` | `false` |
| onChange | 选中状态变化回调 | `(checked: boolean) => void` | - |

### 预设颜色说明

状态色适用于表达业务状态：`success`（成功）、`processing`（进行中，带脉冲动画圆点）、`error`（错误）、`warning`（警告）、`default`（默认）。

预设颜色提供 11 种浅底彩字配色：magenta、red、volcano、orange、gold、lime、green、cyan、blue、geekblue、purple。

传入任意其他色值（如 `#f50`）时，标签渲染为实底白字样式。

## 主题定制

Tag 作为标准 React 组件渲染在 ConfigProvider 的 DOM 树内，通过 CSS 变量继承自动获取主题配置，无需额外桥接。

### 组件级配置

通过 `theme.components.Tag` 进行精细化配置：

```tsx
<ConfigProvider
  theme={{
    components: {
      Tag: {
        colorPrimary: '#722ed1',
        fontSize: 12,
        borderRadius: 4,
        defaultBg: '#fafafa',
        defaultColor: 'rgba(0, 0, 0, 0.88)',
        defaultBorderColor: '#d9d9d9',
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
2. **组件级配置** - `theme.components.Tag` 中的配置
3. **CSS 变量** - 全局 CSS 自定义属性
4. **Less 变量** - 默认值

### 可用的主题配置项

| 配置项 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| colorPrimary | 主色（选中标签背景色） | `string` | 全局 primaryColor |
| fontSize | 字体大小（像素） | `number` | `12` |
| borderRadius | 圆角大小（像素） | `number` | `4` |
| defaultBg | 默认标签背景色 | `string` | `#fafafa` |
| defaultColor | 默认标签文字色 | `string` | `rgba(0, 0, 0, 0.88)` |
| defaultBorderColor | 默认标签边框色 | `string` | `#d9d9d9` |

### 自定义 CSS 变量

也可以直接覆盖 CSS 变量实现更高级的定制：

```tsx
<Tag
  style={{
    '--soui-tag-border-radius': '11px',
    '--soui-tag-default-bg': '#f9f0ff',
  }}
>
  胶囊标签
</Tag>
```

## 设计原则

- 标签文字应简短，建议不超过 8 个字符
- 同一组标签使用统一的颜色语义（如状态色只用于状态场景）
- 可关闭标签关闭后应有对应的数据更新逻辑

## 无障碍访问

- 关闭按钮支持键盘操作（Enter / Space），带 `aria-label="关闭"`
- CheckableTag 使用 `role="checkbox"` + `aria-checked`，支持键盘切换

## 相关资源

- [Badge 徽标数](/components/badge)
