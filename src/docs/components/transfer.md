# Transfer 穿梭框

双栏穿梭选择框，用于在两栏之间移动元素，完成选择。

## 何时使用

- 需要从一组数据中选择部分项移动到另一组
- 需要一个直观的选择界面，展示已选和未选项
- 批量选择场景，如权限分配、用户分组等
- 需要搜索过滤大量数据项

## 代码演示

### 基础用法

最基本的穿梭框用法，支持全选、单选和批量移动。

```tsx
import React, { useState } from 'react';
import { Transfer } from '@soui/ui';

const mockData = Array.from({ length: 20 }).map((_, i) => ({
  key: i.toString(),
  title: `内容 ${i + 1}`,
  description: `这是第 ${i + 1} 项的描述`,
}));

const Demo = () => {
  const [targetKeys, setTargetKeys] = useState(['3', '4', '5']);

  return (
    <Transfer
      dataSource={mockData}
      titles={['待选项', '已选项']}
      targetKeys={targetKeys}
      onChange={(nextTargetKeys) => setTargetKeys(nextTargetKeys)}
      render={(item) => item.title}
    />
  );
};
```

### 带搜索

通过 `showSearch` 开启搜索功能，可配合 `filterOption` 自定义过滤逻辑。

```tsx
import React, { useState } from 'react';
import { Transfer } from '@soui/ui';

const mockData = Array.from({ length: 30 }).map((_, i) => ({
  key: i.toString(),
  title: `项目 ${i + 1}`,
  description: `项目 ${i + 1} 的详细描述信息`,
}));

const Demo = () => {
  const [targetKeys, setTargetKeys] = useState(['5', '6', '7']);

  const filterOption = (inputValue, item) => {
    return item.title.includes(inputValue) || item.description.includes(inputValue);
  };

  return (
    <Transfer
      dataSource={mockData}
      titles={['待选项', '已选项']}
      targetKeys={targetKeys}
      onChange={(nextTargetKeys) => setTargetKeys(nextTargetKeys)}
      showSearch
      filterOption={filterOption}
      render={(item) => `${item.title} - ${item.description}`}
    />
  );
};
```

### 单向模式

使用 `oneWay` 属性开启单向穿梭，仅允许从左向右移动。

```tsx
import React, { useState } from 'react';
import { Transfer } from '@soui/ui';

const mockData = Array.from({ length: 15 }).map((_, i) => ({
  key: i.toString(),
  title: `选项 ${i + 1}`,
}));

const Demo = () => {
  const [targetKeys, setTargetKeys] = useState([]);

  return (
    <Transfer
      dataSource={mockData}
      titles={['待选项', '已选项']}
      targetKeys={targetKeys}
      onChange={(nextTargetKeys) => setTargetKeys(nextTargetKeys)}
      oneWay
      render={(item) => item.title}
    />
  );
};
```

### 自定义渲染

通过 `render` 属性自定义列表项的渲染内容，返回对象时可指定搜索匹配的 `value`。

```tsx
import React, { useState } from 'react';
import { Transfer } from '@soui/ui';

const mockData = Array.from({ length: 12 }).map((_, i) => ({
  key: i.toString(),
  title: `用户 ${i + 1}`,
  description: `user${i + 1}@example.com`,
}));

const Demo = () => {
  const [targetKeys, setTargetKeys] = useState([]);

  return (
    <Transfer
      dataSource={mockData}
      titles={['待选项', '已选项']}
      targetKeys={targetKeys}
      onChange={(nextTargetKeys) => setTargetKeys(nextTargetKeys)}
      showSearch
      render={(item) => ({
        label: (
          <div>
            <div>{item.title}</div>
            <div style={{ fontSize: 12, color: '#999' }}>{item.description}</div>
          </div>
        ),
        value: `${item.title} ${item.description}`,
      })}
    />
  );
};
```

### 主题定制

通过 ConfigProvider 自定义穿梭框的主题样式。

```tsx
import { Transfer, ConfigProvider } from '@soui/ui';

<ConfigProvider
  theme={{
    components: {
      Transfer: {
        borderRadius: 8,
        colorPrimary: '#722ed1',
        headerBg: '#f9f0ff',
      },
    },
  }}
>
  <Transfer dataSource={[]} titles={['待选项', '已选项']} />
</ConfigProvider>;
```

### 空状态

当数据源为空时，穿梭框会显示空状态提示。

```tsx
import { Transfer } from '@soui/ui';

<Transfer dataSource={[]} titles={['待选项', '已选项']} />
```

## API

### 属性

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| dataSource | 数据源 | `TransferItem[]` | `[]` | - |
| targetKeys | 右侧列的 key 集合 | `TransferKey[]` | `[]` | - |
| selectedKeys | 两侧选中的 key 集合 | `TransferKey[]` | - | - |
| onChange | 穿梭操作回调 | `(targetKeys, direction, moveKeys) => void` | - | - |
| onSelectChange | 选中项变化回调 | `(sourceSelectedKeys, targetSelectedKeys) => void` | - | - |
| onSearch | 搜索输入变化回调 | `(direction, value) => void` | - | - |
| onScroll | 列表滚动回调 | `(direction, event) => void` | - | - |
| render | 自定义渲染列表项 | `(item) => ReactNode \| RenderResult` | - | - |
| showSearch | 是否显示搜索框 | `boolean` | `false` | - |
| filterOption | 自定义过滤逻辑 | `(inputValue, item, direction) => boolean` | - | - |
| titles | 左右列标题 | `ReactNode[]` | `['源列表', '目标列表']` | - |
| operations | 操作按钮文字 | `ReactNode[]` | - | - |
| disabled | 是否禁用 | `boolean` | `false` | - |
| oneWay | 单向模式 | `boolean` | `false` | - |
| footer | 底部自定义渲染 | `(props: { direction }) => ReactNode` | - | - |
| listStyle | 列表容器样式 | `CSSProperties` | - | - |
| locale | 国际化配置 | `TransferLocale` | - | - |

### TransferItem

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| key | 唯一标识 | `string \| number` | - |
| title | 显示标题 | `string` | - |
| description | 描述信息 | `string` | - |
| disabled | 是否禁用 | `boolean` | `false` |

### RenderResult

当 `render` 返回对象时，用于自定义渲染和搜索匹配：

| 参数 | 说明 | 类型 |
|------|------|------|
| label | 渲染的 React 元素 | `ReactNode` |
| value | 用于搜索匹配的文本 | `string` |

### TransferLocale

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| titles | 左右列标题 | `ReactNode[]` | - |
| notFoundContent | 空数据提示 | `ReactNode` | `'暂无数据'` |
| searchPlaceholder | 搜索框占位文字 | `string` | `'请输入搜索内容'` |
| itemUnit | 单数单位 | `string` | `'项'` |
| itemsUnit | 复数单位 | `string` | `'项'` |

## 主题定制

Transfer 组件作为标准 React 组件渲染在 ConfigProvider 的 DOM 树内，通过 CSS 变量继承自动获取主题配置。

### 组件级配置

通过 `theme.components.Transfer` 针对穿梭框进行精细化配置：

```tsx
<ConfigProvider
  theme={{
    components: {
      Transfer: {
        borderRadius: 8,
        colorPrimary: '#722ed1',
        colorPrimaryHover: '#9254de',
        headerBg: '#f9f0ff',
        itemActiveBg: 'rgba(114, 46, 209, 0.08)',
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
| borderRadius | 圆角大小（像素） | `number` | `6` |
| fontSize | 字体大小（像素） | `number` | `14` |
| colorPrimary | 主色 | `string` | `#1677ff` |
| colorPrimaryHover | hover 主色 | `string` | `#4096ff` |
| colorBorder | 边框颜色 | `string` | `#d9d9d9` |
| colorBg | 背景色 | `string` | `#fff` |
| headerBg | 标题栏背景色 | `string` | `#f5f5f5` |
| colorText | 文本颜色 | `string` | `rgba(0,0,0,0.88)` |
| colorTextDisabled | 禁用文本颜色 | `string` | `rgba(0,0,0,0.25)` |
| itemHoverBg | 列表项悬停背景色 | `string` | `rgba(0,0,0,0.04)` |
| itemActiveBg | 列表项选中背景色 | `string` | `rgba(22,119,255,0.06)` |

## 常见问题

### Transfer 是否支持非受控模式？

`targetKeys` 始终是受控的，必须由外部状态管理。`selectedKeys` 支持非受控模式，不传时组件内部管理选中状态。

### 如何禁用某些选项？

在 `dataSource` 的数据项中设置 `disabled: true`，该选项将无法被选中和移动。

### 搜索时如何匹配自定义渲染内容？

当使用 `render` 返回 `RenderResult` 对象时，设置 `value` 字段为搜索匹配的文本。也可以传入 `filterOption` 完全自定义过滤逻辑。
