# Dropdown 下拉菜单

向下弹出的列表式菜单，用于收纳一组操作命令。

## 何时使用

- 当页面上的操作命令过多时，用此组件可以收纳操作元素
- 需要触发一组相关操作时（如编辑、复制、删除）
- 需要多级菜单嵌套展示复杂操作结构时

## 代码演示

### 基础用法

最基本的下拉菜单，默认悬停触发展开。

```tsx
import { Dropdown, Button } from '@soui/ui';

const items = [
  { key: '1', label: '菜单项一' },
  { key: '2', label: '菜单项二' },
  { key: '3', label: '菜单项三' },
];

export default () => (
  <Dropdown menu={{ items, onClick: ({ key }) => console.log('点击了:', key) }}>
    <Button type="primary">悬停展开</Button>
  </Dropdown>
);
```

### 触发方式

支持悬停、点击、右键等多种触发方式，可组合使用。

```tsx
import { Dropdown, Button, Space } from '@soui/ui';

const items = [
  { key: 'edit', label: '编辑' },
  { key: 'copy', label: '复制' },
  { key: 'delete', label: '删除' },
];

export default () => (
  <Space>
    <Dropdown menu={{ items }} trigger={['click']}>
      <Button>点击触发</Button>
    </Dropdown>
    <Dropdown menu={{ items }} trigger={['contextMenu']}>
      <Button>右键触发</Button>
    </Dropdown>
  </Space>
);
```

### 弹出位置

支持 6 个方向的弹出位置。

```tsx
import { Dropdown, Button, Space } from '@soui/ui';

const items = [
  { key: '1', label: '菜单项一' },
  { key: '2', label: '菜单项二' },
];

export default () => (
  <Space wrap>
    <Dropdown menu={{ items }} placement="bottomLeft"><Button>bottomLeft</Button></Dropdown>
    <Dropdown menu={{ items }} placement="bottomCenter"><Button>bottomCenter</Button></Dropdown>
    <Dropdown menu={{ items }} placement="bottomRight"><Button>bottomRight</Button></Dropdown>
    <Dropdown menu={{ items }} placement="topLeft"><Button>topLeft</Button></Dropdown>
    <Dropdown menu={{ items }} placement="topCenter"><Button>topCenter</Button></Dropdown>
    <Dropdown menu={{ items }} placement="topRight"><Button>topRight</Button></Dropdown>
  </Space>
);
```

### 多级菜单

支持嵌套子菜单，悬停自动展开下一级。

```tsx
import { Dropdown, Button } from '@soui/ui';

const items = [
  { key: '1', label: '菜单项一' },
  {
    key: 'sub1',
    label: '子菜单一',
    children: [
      { key: '1-1', label: '子菜单项 1-1' },
      { key: '1-2', label: '子菜单项 1-2' },
    ],
  },
];

export default () => (
  <Dropdown menu={{ items }}>
    <Button>多级菜单</Button>
  </Dropdown>
);
```

### 图标与状态

菜单项支持图标、分组、分割线、禁用和危险状态。

```tsx
import { Dropdown, Button, Icon } from '@soui/ui';

const items = [
  { key: 'new', label: '新建文件', icon: <Icon name="Plus" size={14} /> },
  { key: 'save', label: '保存', icon: <Icon name="Save" size={14} /> },
  { key: 'd1', type: 'divider' },
  {
    key: 'g1',
    type: 'group',
    label: '分组标题',
    children: [
      { key: 'g1-1', label: '分组项一' },
    ],
  },
  { key: 'disabled', label: '禁用项', disabled: true },
  { key: 'danger', label: '危险操作', danger: true },
];

export default () => (
  <Dropdown menu={{ items }}>
    <Button>更多操作</Button>
  </Dropdown>
);
```

### 可选中菜单

菜单项支持选中状态，选中项显示勾选图标。

```tsx
import React, { useState } from 'react';
import { Dropdown, Button } from '@soui/ui';

const items = [
  { key: 'left', label: '左对齐' },
  { key: 'center', label: '居中对齐' },
  { key: 'right', label: '右对齐' },
];

export default () => {
  const [selectedKeys, setSelectedKeys] = useState(['center']);

  return (
    <Dropdown
      menu={{
        items,
        selectable: true,
        selectedKeys,
        onClick: ({ key }) => setSelectedKeys([key]),
      }}
      trigger={['click']}
    >
      <Button>对齐方式</Button>
    </Dropdown>
  );
};
```

### 自定义渲染

通过 `dropdownRender` 自定义浮层内容，可在菜单外添加搜索框、操作按钮等。

```tsx
import { Dropdown, Button, Input } from '@soui/ui';

const items = [
  { key: '1', label: '菜单项一' },
  { key: '2', label: '菜单项二' },
];

export default () => (
  <Dropdown
    menu={{ items }}
    trigger={['click']}
    dropdownRender={(menu) => (
      <div>
        <div style={{ padding: 8 }}>
          <Input placeholder="搜索菜单项..." />
        </div>
        {menu}
      </div>
    )}
  >
    <Button>自定义渲染</Button>
  </Dropdown>
);
```

### 主题定制

通过 ConfigProvider 自定义下拉菜单主题。

```tsx
import { Dropdown, Button, ConfigProvider } from '@soui/ui';

const items = [
  { key: '1', label: '菜单项一' },
  { key: '2', label: '菜单项二' },
];

export default () => (
  <ConfigProvider
    theme={{
      primaryColor: '#722ed1',
      components: {
        Dropdown: { borderRadius: 12, itemHoverBg: 'rgba(114, 46, 209, 0.08)' },
      },
    }}
  >
    <Dropdown menu={{ items }} arrow>
      <Button>紫色主题</Button>
    </Dropdown>
  </ConfigProvider>
);
```

## API

### Dropdown 属性

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| menu | 菜单配置 | `DropdownMenuProps` | - |
| trigger | 触发方式数组 | `('hover' \| 'click' \| 'contextMenu')[]` | `['hover']` |
| placement | 浮层位置 | `'bottomLeft' \| 'bottomCenter' \| 'bottomRight' \| 'topLeft' \| 'topCenter' \| 'topRight'` | `'bottomLeft'` |
| open | 是否显示浮层（受控） | `boolean` | - |
| defaultOpen | 默认是否显示浮层 | `boolean` | `false` |
| onOpenChange | 显示/隐藏回调 | `(open: boolean) => void` | - |
| disabled | 是否禁用 | `boolean` | `false` |
| arrow | 是否显示箭头 | `boolean` | `false` |
| autoAdjustOverflow | 是否自动调整位置防止溢出 | `boolean` | `true` |
| destroyPopupOnHide | 隐藏时是否销毁浮层 | `boolean` | `true` |
| zIndex | 浮层层级 | `number` | `1050` |
| overlayClassName | 浮层类名 | `string` | - |
| overlayStyle | 浮层样式 | `CSSProperties` | - |
| dropdownRender | 自定义浮层渲染 | `(menu: ReactNode) => ReactNode` | - |
| getPopupContainer | 指定浮层挂载的节点 | `(node: HTMLElement) => HTMLElement` | - |
| mouseEnterDelay | 鼠标移入延迟时间（秒） | `number` | `0.15` |
| mouseLeaveDelay | 鼠标移出延迟时间（秒） | `number` | `0.1` |

### DropdownMenuProps

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| items | 菜单项数组 | `DropdownMenuItem[]` | - |
| onClick | 点击菜单项回调 | `(info: { key: string }) => void` | - |
| selectable | 是否支持选中 | `boolean` | `false` |
| selectedKeys | 选中的菜单项 key 数组 | `string[]` | - |

### DropdownMenuItem

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| key | 唯一标识 | `string` | - |
| label | 菜单项文字 | `ReactNode` | - |
| icon | 菜单项图标 | `ReactNode` | - |
| disabled | 是否禁用 | `boolean` | `false` |
| danger | 是否为危险项（红色） | `boolean` | `false` |
| type | 菜单项类型 | `'group' \| 'divider'` | - |
| children | 子菜单 | `DropdownMenuItem[]` | - |

## 主题定制

Dropdown 使用 `createPortal` 渲染浮层，Portal 保留 React Context，因此可直接继承 ConfigProvider 的主题配置。

### 组件级配置

通过 `theme.components.Dropdown` 进行精细化配置：

```tsx
<ConfigProvider
  theme={{
    components: {
      Dropdown: {
        colorPrimary: '#722ed1',
        fontSize: 13,
        borderRadius: 8,
        colorBg: '#fff',
        itemHoverBg: 'rgba(0, 0, 0, 0.04)',
        colorError: '#ff4d4f',
      },
    },
  }}
>
  <App />
</ConfigProvider>
```

### 可用的主题配置项

| 配置项 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| colorPrimary | 主色（选中项文字色） | `string` | `#1677ff` |
| fontSize | 字体大小（像素） | `number` | `14` |
| borderRadius | 圆角大小（像素） | `number` | `8` |
| colorBg | 面板背景色 | `string` | `#fff` |
| itemHoverBg | 选项悬停背景色 | `string` | `rgba(0, 0, 0, 0.04)` |
| colorError | 危险项颜色 | `string` | `#ff4d4f` |

### 自定义 CSS 变量

也可以直接覆盖 CSS 变量实现更高级的定制：

```tsx
<Dropdown
  overlayStyle={{
    '--soui-dropdown-color-primary': '#722ed1',
    '--soui-dropdown-border-radius': '12px',
  }}
  menu={{ items }}
>
  <Button>自定义</Button>
</Dropdown>
```

## 设计原则

- 菜单项数量建议控制在 3-10 个之间，过多时考虑分组
- 危险操作（删除等）使用 `danger` 标红并放在菜单底部
- 不常用的操作可以设置 `disabled` 而非直接隐藏

## 无障碍访问

- 支持 ESC 键关闭浮层
- 菜单项支持 `disabled` 状态，禁用项不响应交互
