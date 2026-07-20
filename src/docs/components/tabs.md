# Tabs 标签页

选项卡切换组件，用于在同一区域内切换展示不同内容。

## 何时使用

- 需要在同一区域内切换展示多个面板内容时
- 内容区域较大，需要分块展示时
- 卡片式容器需要明确区域划分时

## 代码演示

### 基础用法

最基本的标签页用法，默认线条式样式。

```tsx
import { Tabs } from '@soui/ui';

const items = [
  { key: '1', label: '标签一', children: <div style={{ padding: 24 }}>标签一的内容</div> },
  { key: '2', label: '标签二', children: <div style={{ padding: 24 }}>标签二的内容</div> },
  { key: '3', label: '标签三', children: <div style={{ padding: 24 }}>标签三的内容</div> },
];

export default () => <Tabs items={items} />;
```

### 卡片式

卡片式标签页，适合需要明确区域划分的场景。

```tsx
import { Tabs } from '@soui/ui';

const items = [
  { key: '1', label: '标签一', children: <div style={{ padding: 24 }}>卡片式标签一</div> },
  { key: '2', label: '标签二', children: <div style={{ padding: 24 }}>卡片式标签二</div> },
  { key: '3', label: '标签三', children: <div style={{ padding: 24 }}>卡片式标签三</div> },
];

export default () => <Tabs type="card" items={items} />;
```

### 位置

支持上、下、左、右四个方向的标签位置。

```tsx
import React, { useState } from 'react';
import { Tabs, Radio, Space } from '@soui/ui';

const items = [
  { key: '1', label: '标签一', children: <div style={{ padding: 24, minHeight: 100 }}>标签一的内容</div> },
  { key: '2', label: '标签二', children: <div style={{ padding: 24, minHeight: 100 }}>标签二的内容</div> },
  { key: '3', label: '标签三', children: <div style={{ padding: 24, minHeight: 100 }}>标签三的内容</div> },
];

export default () => {
  const [position, setPosition] = useState('top');

  return (
    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
      <Radio.Group value={position} onChange={(e) => setPosition(e.target.value)}>
        <Radio.Button value="top">top</Radio.Button>
        <Radio.Button value="bottom">bottom</Radio.Button>
        <Radio.Button value="left">left</Radio.Button>
        <Radio.Button value="right">right</Radio.Button>
      </Radio.Group>
      <Tabs tabPosition={position} items={items} />
    </Space>
  );
};
```

### 尺寸

大、中、小三种尺寸。

```tsx
import { Tabs, Space } from '@soui/ui';

const items = [
  { key: '1', label: '标签一', children: <div style={{ padding: 16 }}>内容一</div> },
  { key: '2', label: '标签二', children: <div style={{ padding: 16 }}>内容二</div> },
  { key: '3', label: '标签三', children: <div style={{ padding: 16 }}>内容三</div> },
];

export default () => (
  <Space direction="vertical" size="large" style={{ width: '100%' }}>
    <Tabs size="small" items={items} />
    <Tabs size="middle" items={items} />
    <Tabs size="large" items={items} />
  </Space>
);
```

### 附加内容

在标签栏右侧或两侧添加额外操作内容。

```tsx
import { Tabs, Button, Space } from '@soui/ui';

const items = [
  { key: '1', label: '标签一', children: <div style={{ padding: 24 }}>标签一的内容</div> },
  { key: '2', label: '标签二', children: <div style={{ padding: 24 }}>标签二的内容</div> },
  { key: '3', label: '标签三', children: <div style={{ padding: 24 }}>标签三的内容</div> },
];

export default () => (
  <Space direction="vertical" size="large" style={{ width: '100%' }}>
    <Tabs
      items={items}
      tabBarExtraContent={<Button type="primary" size="small">操作按钮</Button>}
    />
    <Tabs
      items={items}
      tabBarExtraContent={{
        left: <Button size="small">左侧</Button>,
        right: <Button size="small">右侧</Button>,
      }}
    />
  </Space>
);
```

### 受控模式

通过 activeKey 和 onChange 受控使用，支持禁用标签。

```tsx
import React, { useState } from 'react';
import { Tabs, Space, Button } from '@soui/ui';

const items = [
  { key: '1', label: '标签一', children: <div style={{ padding: 24 }}>标签一的内容</div> },
  { key: '2', label: '标签二', children: <div style={{ padding: 24 }}>标签二的内容</div> },
  { key: '3', label: '标签三', disabled: true, children: <div style={{ padding: 24 }}>标签三（禁用）</div> },
];

export default () => {
  const [activeKey, setActiveKey] = useState('1');

  return (
    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
      <Space>
        <Button size="small" onClick={() => setActiveKey('1')}>激活标签一</Button>
        <Button size="small" onClick={() => setActiveKey('2')}>激活标签二</Button>
      </Space>
      <Tabs activeKey={activeKey} onChange={setActiveKey} items={items} />
    </Space>
  );
};
```

### 图标与居中

为标签添加图标，使用 centered 居中显示。

```tsx
import { Tabs, Icon } from '@soui/ui';

const items = [
  { key: '1', label: '首页', icon: <Icon.Home />, children: <div style={{ padding: 24 }}>首页内容</div> },
  { key: '2', label: '设置', icon: <Icon.Setting />, children: <div style={{ padding: 24 }}>设置内容</div> },
  { key: '3', label: '消息', icon: <Icon.Mail />, children: <div style={{ padding: 24 }}>消息内容</div> },
];

export default () => <Tabs items={items} centered />;
```

### 主题定制

通过 ConfigProvider 自定义标签页主题。

```tsx
import { Tabs, ConfigProvider } from '@soui/ui';

const items = [
  { key: '1', label: '标签一', children: <div style={{ padding: 24 }}>自定义主题标签一</div> },
  { key: '2', label: '标签二', children: <div style={{ padding: 24 }}>自定义主题标签二</div> },
  { key: '3', label: '标签三', children: <div style={{ padding: 24 }}>自定义主题标签三</div> },
];

export default () => (
  <ConfigProvider
    theme={{
      primaryColor: '#722ed1',
      components: {
        Tabs: {
          colorPrimary: '#722ed1',
          fontSize: 15,
          borderRadius: 8,
          cardBg: '#f9f0ff',
        },
      },
    }}
  >
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Tabs items={items} />
      <Tabs type="card" items={items} />
    </div>
  </ConfigProvider>
);
```

### 可编辑标签

可新增和关闭标签页，适用于动态标签管理场景。

```tsx
import React, { useState, useRef } from 'react';
import { Tabs } from '@soui/ui';

const initialItems = [
  { key: '1', label: '标签一', children: <div style={{ padding: 24 }}>标签一的内容</div> },
  { key: '2', label: '标签二', children: <div style={{ padding: 24 }}>标签二的内容</div> },
  { key: '3', label: '标签三', children: <div style={{ padding: 24 }}>标签三的内容</div> },
];

export default () => {
  const [items, setItems] = useState(initialItems);
  const [activeKey, setActiveKey] = useState('1');
  const newTabIndex = useRef(4);

  const onEdit = (targetKey, action) => {
    if (action === 'add') {
      const key = String(newTabIndex.current++);
      setItems((prev) => [...prev, { key, label: `新标签 ${key}`, children: <div style={{ padding: 24 }}>新标签 {key}</div> }]);
      setActiveKey(key);
    } else {
      const newItems = items.filter((item) => item.key !== targetKey);
      if (activeKey === targetKey && newItems.length > 0) {
        const index = items.findIndex((item) => item.key === targetKey);
        setActiveKey(newItems[Math.min(index, newItems.length - 1)].key);
      }
      setItems(newItems);
    }
  };

  return <Tabs type="editable-card" items={items} activeKey={activeKey} onChange={setActiveKey} onEdit={onEdit} />;
};
```

### 标签间距

通过 tabBarGutter 自定义标签之间的间距。

```tsx
import { Tabs, Space } from '@soui/ui';

const items = [
  { key: '1', label: '标签一', children: <div style={{ padding: 16 }}>内容一</div> },
  { key: '2', label: '标签二', children: <div style={{ padding: 16 }}>内容二</div> },
  { key: '3', label: '标签三', children: <div style={{ padding: 16 }}>内容三</div> },
  { key: '4', label: '标签四', children: <div style={{ padding: 16 }}>内容四</div> },
];

export default () => (
  <Space direction="vertical" size="large" style={{ width: '100%' }}>
    <Tabs items={items} tabBarGutter={0} />
    <Tabs items={items} tabBarGutter={24} />
    <Tabs items={items} tabBarGutter={48} type="card" />
  </Space>
);
```

### 销毁与样式

destroyInactiveTabPane 切换时销毁非激活面板，tabBarStyle 自定义标签栏样式。

```tsx
import { Tabs, Space } from '@soui/ui';

const items = [
  { key: '1', label: '标签一', children: <div style={{ padding: 24 }}>标签一的内容</div> },
  { key: '2', label: '标签二', children: <div style={{ padding: 24 }}>标签二的内容</div> },
  { key: '3', label: '标签三', children: <div style={{ padding: 24 }}>标签三的内容</div> },
];

export default () => (
  <Space direction="vertical" size="large" style={{ width: '100%' }}>
    <Tabs items={items} destroyInactiveTabPane />
    <Tabs type="card" items={items} tabBarStyle={{ background: '#fafafa', padding: '4px 8px 0', borderRadius: 6 }} />
  </Space>
);
```

## API

### Tabs

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| items | 标签页配置项 | `TabItem[]` | `[]` | - |
| activeKey | 当前激活标签的 key（受控） | `string` | - | - |
| defaultActiveKey | 默认激活标签的 key | `string` | 第一个标签的 key | - |
| onChange | 切换标签时的回调 | `(key: string) => void` | - | - |
| type | 标签页类型 | `'line' \| 'card' \| 'editable-card'` | `'line'` | - |
| size | 标签页尺寸 | `'small' \| 'middle' \| 'large'` | `'middle'` | - |
| tabPosition | 标签位置 | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | - |
| centered | 标签是否居中展示 | `boolean` | `false` | - |
| tabBarExtraContent | 标签栏附加内容 | `ReactNode \| { left?: ReactNode; right?: ReactNode }` | - | - |
| tabBarGutter | 标签之间的间距（像素） | `number` | - | - |
| tabBarStyle | 标签栏自定义样式 | `CSSProperties` | - | - |
| animated | 是否启用切换动画 | `boolean` | `true` | - |
| onTabClick | 标签点击回调 | `(key: string, e: React.MouseEvent) => void` | - | - |
| onEdit | 编辑回调（新增/关闭） | `(targetKey: string \| MouseEvent, action: 'add' \| 'remove') => void` | - | - |
| hideAdd | 隐藏添加按钮（editable-card） | `boolean` | `false` | - |
| destroyInactiveTabPane | 切换时销毁非激活面板 | `boolean` | `false` | - |

### TabItem

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| key | 唯一标识 | `string` | - | - |
| label | 标签标题 | `ReactNode` | - | - |
| children | 标签内容 | `ReactNode` | - | - |
| disabled | 是否禁用 | `boolean` | `false` | - |
| icon | 标签图标 | `ReactNode` | - | - |
| forceRender | 非激活时是否预渲染 | `boolean` | `false` | - |
| closable | 是否可关闭（editable-card） | `boolean` | `true` | - |

## 主题定制

Tabs 组件支持通过 ConfigProvider 进行主题定制，遵循 SoUi 三层设计令牌系统。

Tabs 作为标准 React 组件渲染在 ConfigProvider 的 DOM 树内，通过 CSS 变量继承自动获取主题配置，无需额外桥接。

### 组件级配置

通过 `theme.components.Tabs` 针对组件进行精细化配置：

```tsx
<ConfigProvider
  theme={{
    components: {
      Tabs: {
        colorPrimary: '#1677ff',
        fontSize: 14,
        borderRadius: 6,
        itemActiveColor: '#1677ff',
        cardBg: '#fafafa',
      },
    },
  }}
>
  <YourApp />
</ConfigProvider>
```

### 可用的主题配置项

| 配置项 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| colorPrimary | 主色（激活标签、指示条） | `string` | `#1677ff` |
| fontSize | 字体大小（像素） | `number` | `14` |
| borderRadius | 圆角大小（像素，卡片模式） | `number` | `6` |
| itemActiveColor | 激活标签文字颜色 | `string` | 同 colorPrimary |
| cardBg | 卡片模式背景色 | `string` | `#fafafa` |

### 自定义 CSS 变量

对于更高级的定制需求，可以直接覆盖 CSS 变量：

```tsx
<Tabs
  style={{
    '--soui-tabs-color-primary': '#722ed1',
    '--soui-tabs-font-size': '15px',
  }}
/>
```

## 设计原则

### ✅ 推荐用法

```tsx
// 使用 items 数组配置标签页
<Tabs items={[{ key: '1', label: '标签', children: <div>内容</div> }]} />

// 受控模式配合 onChange
<Tabs activeKey={activeKey} onChange={setActiveKey} items={items} />
```

### ❌ 避免使用

```tsx
// 避免在 items 中使用重复的 key
<Tabs items={[{ key: '1', ... }, { key: '1', ... }]} />
```

## 无障碍访问

- 标签栏使用 `role="tablist"` 语义化标记
- 每个标签使用 `role="tab"` 并设置 `aria-selected`
- 内容面板使用 `role="tabpanel"` 并关联对应标签
- 支持键盘导航：左右方向键切换标签，Home/End 跳转首尾
