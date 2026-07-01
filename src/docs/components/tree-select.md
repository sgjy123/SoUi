# TreeSelect 树形下拉

树形选择器，用于在树形结构中进行选择，支持单选、多选、勾选、搜索等模式。

## 何时使用

- 需要从层级结构中选择节点，如组织架构、行政区划、分类目录等。
- 需要同时选择多个节点或父子联动勾选。
- 需要在选项较多时通过搜索快速定位。

## 代码演示

### 基础用法

基础单选、默认值、受控模式和禁用状态。

```tsx
import { TreeSelect } from '@soui/ui';

const treeData = [
  {
    value: 'zhejiang',
    label: '浙江',
    children: [
      {
        value: 'hangzhou',
        label: '杭州',
        children: [
          { value: 'xihu', label: '西湖区' },
          { value: 'yuhang', label: '余杭区' },
        ],
      },
    ],
  },
];

export default () => (
  <TreeSelect
    treeData={treeData}
    defaultValue="xihu"
    placeholder="请选择"
    style={{ width: 300 }}
  />
);
```

### 多选模式

使用 `multiple` 开启多选，支持 `maxTagCount` 限制标签数量。

```tsx
<TreeSelect
  multiple
  treeData={treeData}
  defaultValue={['xihu', 'gusu']}
  maxTagCount={2}
  placeholder="请选择节点"
  style={{ width: 300 }}
/>
```

### 可勾选模式

使用 `treeCheckable` 开启勾选，父子节点会自动联动。通过 `showCheckedStrategy` 控制回填策略：

- `SHOW_CHILD`：只显示子节点（默认）。
- `SHOW_PARENT`：只显示父节点。
- `SHOW_ALL`：显示所有选中的节点。

```tsx
<TreeSelect
  treeCheckable
  showCheckedStrategy="SHOW_PARENT"
  treeData={treeData}
  defaultValue={['zhejiang']}
  placeholder="请勾选节点"
  style={{ width: 300 }}
/>
```

### 搜索与状态

使用 `showSearch` 开启搜索，支持 `size` 和 `status` 调整尺寸与校验状态。

```tsx
<div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 300 }}>
  <TreeSelect showSearch treeData={treeData} placeholder="输入关键词搜索" />
  <TreeSelect showSearch treeData={treeData} status="error" placeholder="错误状态" />
  <TreeSelect showSearch treeData={treeData} status="warning" placeholder="警告状态" />
</div>
```

### 异步加载

为需要异步加载的节点设置 `isLeaf: false`，并在 `loadData` 中加载子节点数据后更新 `treeData`。

```tsx
import { TreeSelect } from '@soui/ui';
import { useState } from 'react';

const initialData = [
  { value: '0-0', label: '异步节点 1', isLeaf: false },
  { value: '0-1', label: '异步节点 2', isLeaf: false },
  { value: '0-2', label: '叶子节点', isLeaf: true },
];

export default () => {
  const [treeData, setTreeData] = useState(initialData);

  const loadData = (node) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newChildren = [
          { value: `${node.value}-0`, label: `${node.label} 的子节点 1`, isLeaf: true },
          { value: `${node.value}-1`, label: `${node.label} 的子节点 2`, isLeaf: true },
        ];
        setTreeData((prev) => {
          // 递归查找并更新目标节点
          const next = [...prev];
          const walk = (list) => {
            for (const item of list) {
              if (item.value === node.value) return item;
              if (item.children) {
                const found = walk(item.children);
                if (found) return found;
              }
            }
            return null;
          };
          const target = walk(next);
          if (target) target.children = newChildren;
          return next;
        });
        resolve();
      }, 800);
    });
  };

  return <TreeSelect treeData={treeData} loadData={loadData} placeholder="请选择" />;
};
```

### 受控展开

通过 `treeExpandedKeys` 和 `onTreeExpand` 完全控制节点的展开收起。

```tsx
import { TreeSelect } from '@soui/ui';
import { useState } from 'react';

export default () => {
  const [expandedKeys, setExpandedKeys] = useState(['parent-1']);
  const [value, setValue] = useState('leaf-1-1-1');

  return (
    <TreeSelect
      treeData={treeData}
      value={value}
      onChange={(val) => setValue(val)}
      treeExpandedKeys={expandedKeys}
      onTreeExpand={(keys) => setExpandedKeys(keys)}
      placeholder="请选择"
    />
  );
};
```

### 自定义字段名

当后端返回的数据字段不是 `label/value/children` 时，使用 `fieldNames` 进行映射。

```tsx
import { TreeSelect } from '@soui/ui';

const backendData = [
  {
    id: 1,
    value: 1,
    name: '研发部',
    subItems: [
      { id: 11, value: 11, name: '前端组', subItems: [{ id: 111, value: 111, name: 'React 小组' }] },
    ],
  },
];

export default () => (
  <TreeSelect
    treeData={backendData}
    fieldNames={{ label: 'name', value: 'id', children: 'subItems' }}
    placeholder="请选择部门"
  />
);
```

### 禁用节点

在 `treeData` 中为节点设置 `disabled: true`，即可禁用该节点。禁用节点在勾选模式下不会参与父子联动。

```tsx
const treeData = [
  {
    value: 'zhejiang',
    label: '浙江',
    children: [
      { value: 'hangzhou', label: '杭州', disabled: true },
      { value: 'ningbo', label: '宁波', children: [{ value: 'haishu', label: '海曙区', disabled: true }] },
    ],
  },
];

export default () => <TreeSelect treeData={treeData} placeholder="请选择" />;
```

### 大数据量

TreeSelect 适用于节点较多的场景，配合 `showSearch` 快速过滤节点。

```tsx
import { TreeSelect } from '@soui/ui';
import { useMemo } from 'react';

export default () => {
  const treeData = useMemo(() => {
    const data = [];
    for (let i = 0; i < 26; i++) {
      const letter = String.fromCharCode(65 + i);
      data.push({
        value: letter,
        label: `分类 ${letter}`,
        children: Array.from({ length: 40 }, (_, j) => ({
          value: `${letter}-${j + 1}`,
          label: `${letter} 节点 ${j + 1}`,
        })),
      });
    }
    return data;
  }, []);

  return <TreeSelect treeData={treeData} showSearch multiple placeholder="请选择节点" />;
};
```

### 主题定制

通过 `ConfigProvider` 自定义主题色、圆角、选中背景等。

```tsx
<ConfigProvider
  theme={{
    primaryColor: '#52c41a',
    primaryHoverColor: '#73d13d',
    components: {
      TreeSelect: {
        borderRadius: 8,
        optionSelectedBg: 'rgba(82, 196, 26, 0.08)',
      },
    },
  }}
>
  <TreeSelect treeData={treeData} defaultValue="xihu" showSearch />
</ConfigProvider>
```

## API

### 属性

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| treeData | 树形数据 | `TreeSelectOption[]` | `[]` |
| value | 指定选中的值（受控） | `string \| number \| (string \| number)[]` | - |
| defaultValue | 默认选中的值 | `string \| number \| (string \| number)[]` | - |
| onChange | 选中值变化回调 | `(value, option) => void` | - |
| onSelect | 选中节点时的回调 | `(value, option) => void` | - |
| onDeselect | 取消选中节点时的回调 | `(value, option) => void` | - |
| multiple | 是否多选 | `boolean` | `false` |
| treeCheckable | 是否启用节点勾选 | `boolean` | `false` |
| treeCheckStrictly | 勾选状态是否严格受控，不联动父子 | `boolean` | `false` |
| showSearch | 是否启用搜索 | `boolean` | `false` |
| allowClear | 是否显示清除按钮 | `boolean` | `false` |
| placeholder | 占位文本 | `React.ReactNode` | - |
| disabled | 是否禁用 | `boolean` | `false` |
| size | 尺寸 | `'large' \| 'middle' \| 'small'` | `'middle'` |
| status | 校验状态 | `'error' \| 'warning'` | - |
| treeDefaultExpandAll | 默认展开所有节点 | `boolean` | `false` |
| treeDefaultExpandedKeys | 默认展开的节点 key | `React.Key[]` | - |
| treeExpandedKeys | 受控展开的节点 key | `React.Key[]` | - |
| onTreeExpand | 展开节点变化回调 | `(expandedKeys) => void` | - |
| loadData | 异步加载子节点数据 | `(node) => Promise<void> \| void` | - |
| fieldNames | 自定义字段名映射 | `TreeSelectFieldNames` | `{ label: 'label', value: 'value', children: 'children' }` |
| treeNodeFilterProp | 搜索时过滤的属性名 | `string` | `'label'` |
| treeNodeLabelProp | 标签显示使用的属性名 | `string` | `'label'` |
| dropdownMatchSelectWidth | 下拉菜单宽度是否与选择器相同 | `boolean \| number` | `true` |
| maxTagCount | 多选时最多显示的标签数量 | `number` | - |
| maxTagPlaceholder | 隐藏标签时的占位 | `React.ReactNode \| ((omittedValues) => React.ReactNode)` | - |
| tagRender | 自定义标签渲染 | `(props) => React.ReactNode` | - |
| showCheckedStrategy | 勾选回填策略 | `'SHOW_ALL' \| 'SHOW_PARENT' \| 'SHOW_CHILD'` | `'SHOW_CHILD'` |
| treeTitleRender | 自定义节点标题渲染 | `(node) => React.ReactNode` | - |
| suffixIcon | 自定义后缀图标 | `React.ReactNode` | - |
| notFoundContent | 空数据时显示的内容 | `React.ReactNode` | `'暂无数据'` |
| dropdownRender | 自定义下拉菜单内容 | `(menu) => React.ReactElement` | - |
| onDropdownVisibleChange | 下拉菜单展开/收起回调 | `(open) => void` | - |
| open | 受控下拉菜单显隐 | `boolean` | - |
| defaultOpen | 默认下拉菜单显隐 | `boolean` | `false` |
| dropdownClassName | 下拉菜单自定义类名 | `string` | - |

### TreeSelectOption

| 参数 | 说明 | 类型 |
|------|------|------|
| label | 节点文本 | `React.ReactNode` |
| value | 节点值 | `string \| number` |
| children | 子节点 | `TreeSelectOption[]` |
| disabled | 是否禁用 | `boolean` |
| isLeaf | 是否为叶子节点（用于异步加载） | `boolean` |

### TreeSelectFieldNames

| 参数 | 说明 | 类型 |
|------|------|------|
| label | 自定义 label 字段名 | `string` |
| value | 自定义 value 字段名 | `string` |
| children | 自定义 children 字段名 | `string` |

## 主题定制

TreeSelect 作为标准 React 组件渲染在 `ConfigProvider` 的 DOM 树内，通过 CSS 变量继承自动获取主题配置。

### 组件级配置

通过 `theme.components.TreeSelect` 针对组件进行精细化配置：

```tsx
<ConfigProvider
  theme={{
    components: {
      TreeSelect: {
        borderRadius: 8,
        fontSize: 14,
        controlHeight: 32,
        optionSelectedBg: 'rgba(22, 119, 255, 0.12)',
      },
    },
  }}
>
  <YourApp />
</ConfigProvider>
```

### 配置优先级

配置优先级从高到低：

1. **Props (style/className)** - 直接传入的样式属性。
2. **组件级配置** - `theme.components.TreeSelect` 中的配置。
3. **CSS 变量** - 全局 CSS 自定义属性。
4. **Less 变量** - 默认值。

### 可用的主题配置项

| 配置项 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| borderRadius | 圆角大小（像素） | `number` | `6` |
| fontSize | 字体大小（像素） | `number` | `14` |
| controlHeight | 控件高度（像素） | `number` | `32` |
| colorBorder | 边框颜色 | `string` | `#d9d9d9` |
| colorBorderHover | 悬停边框颜色 | `string` | `#4096ff` |
| colorBorderFocus | 聚焦边框颜色 | `string` | `#1677ff` |
| colorBg | 背景色 | `string` | `#fff` |
| colorText | 文本颜色 | `string` | `rgba(0, 0, 0, 0.88)` |
| colorBgDisabled | 禁用背景色 | `string` | `#f5f5f5` |
| colorTextDisabled | 禁用文本颜色 | `string` | `rgba(0, 0, 0, 0.25)` |
| colorError | 错误状态颜色 | `string` | `#ff4d4f` |
| colorWarning | 警告状态颜色 | `string` | `#faad14` |
| dropdownBg | 下拉面板背景色 | `string` | `#fff` |
| optionActiveBg | 选项悬停背景色 | `string` | `rgba(0, 0, 0, 0.04)` |
| optionSelectedBg | 选项选中背景色 | `string` | `rgba(22, 119, 255, 0.08)` |
| tagBg | 多选标签背景色 | `string` | `#fafafa` |

### 自定义 CSS 变量

对于更高级的定制需求，可以直接覆盖 CSS 变量：

```tsx
<TreeSelect
  style={{
    '--soui-tree-select-border-radius': '10px',
    '--soui-tree-select-option-selected-bg': 'rgba(82, 196, 26, 0.12)',
  }}
/>
```

## 设计原则

### ✅ 推荐用法

```tsx
// 使用 treeData 配置树形数据
<TreeSelect treeData={treeData} placeholder="请选择" />

// 勾选模式使用 showCheckedStrategy 明确回填策略
<TreeSelect treeCheckable showCheckedStrategy="SHOW_PARENT" treeData={treeData} />
```

### ❌ 避免使用

```tsx
// value 与 multiple/treeCheckable 模式不匹配
<TreeSelect multiple value="single" treeData={treeData} />

// 异步加载时未设置 isLeaf
<TreeSelect loadData={loadData} treeData={treeData} />
```

## 无障碍访问

- 选择器根节点具有 `role="combobox"` 语义，下拉面板为 `role="listbox"`。
- 树节点具有 `role="treeitem"`，支持 `aria-selected`、`aria-expanded`、`aria-disabled` 等属性。
- 支持键盘操作：上下箭头切换、左右箭头展开/收起、回车选择、Esc 关闭。
- 清除按钮和标签移除按钮均提供 `aria-label` 描述。

## FAQ

### TreeSelect 与 Cascader 的区别？

- **Cascader**：用于级联选择，通常按照层级路径选择，下拉面板展示为多列。
- **TreeSelect**：基于树形结构选择，可展开/收起同一层级，支持勾选和半选状态。

### 如何实现异步加载？

在 `loadData` 中加载子节点数据，并为需要异步加载的节点设置 `isLeaf: false`。加载完成后更新 `treeData`。

```tsx
const loadData = async (node) => {
  const children = await fetchChildren(node.value);
  // 更新 treeData
};

<TreeSelect loadData={loadData} treeData={treeData} />
```

### 勾选模式下如何只返回叶子节点？

使用 `showCheckedStrategy="SHOW_CHILD"`（默认值），`onChange` 返回的值将只包含最底层的选中节点。

## 相关资源

- [Select 选择器](/components/select)
- [Cascader 级联选择](/components/cascader)
- [ConfigProvider 主题配置](/theming/config-provider)
