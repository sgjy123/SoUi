# TreeSelect 树形下拉

树形下拉选择器，以树形结构展示数据并支持选择，适用于组织架构、分类目录等具有层级关系的数据选择场景。

## 何时使用

- 需要从具有树形层级结构的数据中选择一项或多项时
- 数据量较大且存在明确的父子关系（如部门、分类、权限树）
- 需要展开/收起节点来浏览不同层级的数据
- 需要支持勾选（checkbox）模式进行批量选择
- 替代嵌套 Select，提供更直观的树形选择体验

## 代码演示

### 基础用法

最基本的树形下拉选择器，支持单选、默认值和禁用状态。

```tsx
import { useState } from 'react';
import { TreeSelect } from '@soui/ui';

const treeData = [
  {
    title: '研发部',
    value: 'rd',
    children: [
      {
        title: '前端组',
        value: 'fe',
        children: [
          { title: '张三', value: 'zhangsan' },
          { title: '李四', value: 'lisi' },
        ],
      },
      {
        title: '后端组',
        value: 'be',
        children: [
          { title: '王五', value: 'wangwu' },
          { title: '赵六', value: 'zhaoliu' },
        ],
      },
    ],
  },
  {
    title: '设计部',
    value: 'design',
    children: [
      { title: '孙七', value: 'sunqi' },
      { title: '周八', value: 'zhouba' },
    ],
  },
];

export default () => {
  const [value, setValue] = useState();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400 }}>
      <TreeSelect treeData={treeData} placeholder="请选择人员" value={value} onChange={setValue} />
      <TreeSelect treeData={treeData} defaultValue="zhangsan" placeholder="带默认值" />
      <TreeSelect treeData={treeData} disabled defaultValue="fe" placeholder="禁用" />
    </div>
  );
};
```

### 多选

通过 `multiple` 启用多选模式，可以同时选择多个节点，配合 `maxTagCount` 控制标签显示数量。

```tsx
import { useState } from 'react';
import { TreeSelect } from '@soui/ui';

const treeData = [
  {
    title: '研发部',
    value: 'rd',
    children: [
      { title: '前端组', value: 'fe', children: [{ title: '张三', value: 'zhangsan' }, { title: '李四', value: 'lisi' }] },
      { title: '后端组', value: 'be', children: [{ title: '王五', value: 'wangwu' }] },
    ],
  },
  {
    title: '设计部',
    value: 'design',
    children: [
      { title: '孙七', value: 'sunqi' },
    ],
  },
];

export default () => {
  const [value, setValue] = useState(['zhangsan']);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 500 }}>
      <TreeSelect multiple treeData={treeData} value={value} onChange={setValue} placeholder="请选择人员" />
      <TreeSelect multiple treeData={treeData} maxTagCount={2} defaultValue={['zhangsan', 'lisi', 'wangwu']} placeholder="限制标签数" />
    </div>
  );
};
```

### 可勾选

通过 `treeCheckable` 启用勾选模式，支持复选框选择，配合 `showCheckedStrategy` 控制显示策略。

```tsx
import { useState } from 'react';
import { TreeSelect } from '@soui/ui';

const treeData = [
  {
    title: '研发部',
    value: 'rd',
    children: [
      { title: '前端组', value: 'fe', children: [{ title: '张三', value: 'zhangsan' }, { title: '李四', value: 'lisi' }] },
      { title: '后端组', value: 'be', children: [{ title: '王五', value: 'wangwu' }, { title: '赵六', value: 'zhaoliu' }] },
    ],
  },
  {
    title: '设计部',
    value: 'design',
    children: [
      { title: '孙七', value: 'sunqi' },
      { title: '周八', value: 'zhouba' },
    ],
  },
];

export default () => {
  const [value, setValue] = useState([]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 500 }}>
      <TreeSelect
        treeCheckable
        treeData={treeData}
        value={value}
        onChange={setValue}
        treeDefaultExpandAll
        placeholder="请勾选人员"
      />
      <TreeSelect
        treeCheckable
        showCheckedStrategy="SHOW_PARENT"
        treeData={treeData}
        treeDefaultExpandAll
        placeholder="仅显示父级"
      />
    </div>
  );
};
```

### 搜索

通过 `showSearch` 启用搜索过滤，可以快速定位树节点。支持自定义过滤逻辑。

```tsx
import { TreeSelect } from '@soui/ui';

const treeData = [
  {
    title: '研发部',
    value: 'rd',
    children: [
      { title: '前端组', value: 'fe', children: [{ title: '张三', value: 'zhangsan' }, { title: '李四', value: 'lisi' }] },
      { title: '后端组', value: 'be', children: [{ title: '王五', value: 'wangwu' }] },
    ],
  },
  {
    title: '设计部',
    value: 'design',
    children: [
      { title: '孙七', value: 'sunqi' },
    ],
  },
];

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400 }}>
    <TreeSelect treeData={treeData} showSearch treeDefaultExpandAll placeholder="输入关键词搜索" />
    <TreeSelect
      treeData={treeData}
      showSearch
      treeDefaultExpandAll
      treeNodeFilterProp="title"
      placeholder="按标题搜索"
      status="error"
    />
  </div>
);
```

### 主题定制

通过 `ConfigProvider` 自定义 TreeSelect 的主题样式。

```tsx
import { TreeSelect, ConfigProvider } from '@soui/ui';

const treeData = [
  {
    title: '研发部',
    value: 'rd',
    children: [
      { title: '前端组', value: 'fe', children: [{ title: '张三', value: 'zhangsan' }, { title: '李四', value: 'lisi' }] },
    ],
  },
  {
    title: '设计部',
    value: 'design',
    children: [
      { title: '孙七', value: 'sunqi' },
    ],
  },
];

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 400 }}>
    <ConfigProvider
      theme={{
        primaryColor: '#52c41a',
        components: { TreeSelect: { borderRadius: 8 } },
      }}
    >
      <TreeSelect treeData={treeData} defaultValue="zhangsan" treeDefaultExpandAll placeholder="绿色主题" />
    </ConfigProvider>
    <ConfigProvider
      theme={{
        primaryColor: '#722ed1',
        components: { TreeSelect: { borderRadius: 10, colorBorder: '#d3adf7' } },
      }}
    >
      <TreeSelect treeData={treeData} defaultValue="zhangsan" treeDefaultExpandAll placeholder="紫色主题" />
    </ConfigProvider>
  </div>
);
```

## API

### 属性

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| treeData | 可选项数据 | `TreeSelectOption[]` | `[]` |
| value | 指定选中的值（受控）。单选: `string \| number`，多选: `(string \| number)[]` | `string \| number \| (string \| number)[]` | - |
| defaultValue | 默认选中的值 | `string \| number \| (string \| number)[]` | - |
| onChange | 选中变化回调 | `(value, label?) => void` | - |
| multiple | 是否多选 | `boolean` | `false` |
| treeCheckable | 是否显示复选框（多选模式） | `boolean` | `false` |
| showCheckedStrategy | 多选勾选时显示策略 | `'SHOW_ALL' \| 'SHOW_PARENT' \| 'SHOW_CHILD'` | `'SHOW_ALL'` |
| disabled | 是否禁用 | `boolean` | `false` |
| allowClear | 是否显示清除按钮 | `boolean` | `true` |
| onClear | 清除回调 | `() => void` | - |
| placeholder | 占位文本 | `ReactNode` | - |
| size | 尺寸 | `'large' \| 'middle' \| 'small'` | `'middle'` |
| status | 校验状态 | `'error' \| 'warning'` | - |
| showSearch | 是否启用搜索 | `boolean` | `false` |
| filterTreeNode | 搜索过滤函数 | `(inputValue: string, treeNode: TreeSelectOption) => boolean` | - |
| treeNodeFilterProp | 用于搜索过滤的字段名 | `'title' \| 'value'` | `'value'` |
| treeDefaultExpandAll | 默认展开所有节点 | `boolean` | `false` |
| treeDefaultExpandedKeys | 默认展开的节点 keys | `(string \| number)[]` | - |
| treeExpandedKeys | 展开的节点 keys（受控） | `(string \| number)[]` | - |
| onTreeExpand | 展开/收起回调 | `(expandedKeys: (string \| number)[]) => void` | - |
| loadData | 异步加载子级数据 | `(treeNode: TreeSelectOption) => void` | - |
| fieldNames | 自定义字段名映射 | `{ label?: string; value?: string; children?: string }` | - |
| maxTagCount | 多选时最多显示的标签数量 | `number` | - |
| maxTagPlaceholder | 多选时隐藏标签的占位 | `ReactNode \| ((omittedValues) => ReactNode)` | - |
| suffixIcon | 自定义后缀图标 | `ReactNode` | - |
| switcherIcon | 自定义展开/折叠图标 | `ReactNode` | - |
| notFoundContent | 空数据时显示的内容 | `ReactNode` | `'暂无数据'` |
| dropdownRender | 自定义下拉菜单内容 | `(menu: ReactElement) => ReactElement` | - |
| open | 控制下拉菜单显隐（受控） | `boolean` | - |
| onDropdownVisibleChange | 下拉菜单展开/收起回调 | `(open: boolean) => void` | - |
| treeLine | 是否显示树连接线 | `boolean` | `false` |
| popupClassName | 下拉菜单自定义类名 | `string` | - |

### TreeSelectOption

```typescript
interface TreeSelectOption {
  value: string | number;
  title?: ReactNode;
  children?: TreeSelectOption[];
  disabled?: boolean;
  selectable?: boolean;
  isLeaf?: boolean;
  key?: string | number;
  [key: string]: any;
}
```

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| value | 选项值（必填） | `string \| number` | - |
| title | 显示文本 | `ReactNode` | - |
| children | 子级选项 | `TreeSelectOption[]` | - |
| disabled | 是否禁用 | `boolean` | `false` |
| selectable | 是否可选（父级设为 false 则不可选中） | `boolean` | `true` |
| isLeaf | 是否为叶子节点（异步加载时标记） | `boolean` | - |
| key | 自定义 key | `string \| number` | - |

### TreeSelectRef

| 方法 | 说明 |
|------|------|
| focus | 聚焦 |
| blur | 失焦并关闭下拉 |

### showCheckedStrategy

| 值 | 说明 |
|------|------|
| `SHOW_ALL` | 显示所有选中的节点 |
| `SHOW_PARENT` | 仅显示选中的父级节点（子级全选中时合并为父级） |
| `SHOW_CHILD` | 仅显示叶子节点 |

## 主题定制

TreeSelect 组件支持通过 ConfigProvider 进行主题定制，遵循 SoUi 三层设计令牌系统。

TreeSelect 使用 `ReactDOM.createPortal` 将下拉面板渲染在 `document.body` 上，位于 ConfigProvider 的 DOM 树之外。通过 DOM 桥接机制（`getComputedStyle` 读取 `.soui-config-provider` 上的 CSS 变量并复制到 Portal 容器）来实现主题同步。

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
        colorBorder: '#d9d9d9',
        colorBorderHover: '#4096ff',
        colorBorderFocus: '#1677ff',
        colorBg: '#ffffff',
        colorText: 'rgba(0, 0, 0, 0.88)',
        dropdownBg: '#ffffff',
        optionActiveBg: 'rgba(0, 0, 0, 0.04)',
        optionSelectedBg: 'rgba(22, 119, 255, 0.08)',
        tagBg: '#fafafa',
      },
    },
  }}
>
  <TreeSelect treeData={treeData} placeholder="请选择" />
</ConfigProvider>
```

### 配置优先级

配置优先级从高到低：

1. **Props (style/className)** - 直接传入的样式属性
2. **组件级配置** - `theme.components.TreeSelect` 中的配置
3. **CSS 变量** - 全局 CSS 自定义属性
4. **Less 变量** - 默认值

### 可用的主题配置项

| 配置项 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| borderRadius | 圆角大小（像素） | `number` | 继承全局 `borderRadius`（6） |
| fontSize | 字体大小（像素） | `number` | 继承全局 `fontSize`（14） |
| controlHeight | 控件高度（像素） | `number` | `32` |
| colorBorder | 边框颜色 | `string` | 继承全局 `borderColorBase`（#d9d9d9） |
| colorBorderHover | 悬停边框颜色 | `string` | 继承全局 `primaryHoverColor`（#4096ff） |
| colorBorderFocus | 聚焦边框颜色 | `string` | 继承全局 `primaryColor`（#1677ff） |
| colorBg | 背景色 | `string` | `#ffffff` |
| colorText | 文本颜色 | `string` | `rgba(0, 0, 0, 0.88)` |
| colorBgDisabled | 禁用背景色 | `string` | `#f5f5f5` |
| colorTextDisabled | 禁用文本颜色 | `string` | `rgba(0, 0, 0, 0.25)` |
| colorError | 错误状态颜色 | `string` | 继承全局 `errorColor`（#ff4d4f） |
| colorWarning | 警告状态颜色 | `string` | 继承全局 `warningColor`（#faad14） |
| dropdownBg | 下拉面板背景色 | `string` | `#ffffff` |
| optionActiveBg | 选项悬停背景色 | `string` | `rgba(0, 0, 0, 0.04)` |
| optionSelectedBg | 选项选中背景色 | `string` | `rgba(22, 119, 255, 0.08)` |
| tagBg | 多选标签背景色 | `string` | `#fafafa` |

### 自定义 CSS 变量

对于更高级的定制需求，可以直接覆盖 CSS 变量：

```tsx
<TreeSelect
  treeData={treeData}
  style={{
    '--soui-tree-select-border-radius': '10px',
    '--soui-tree-select-option-selected-bg': 'rgba(82, 196, 26, 0.08)',
  }}
/>
```

## 键盘操作

TreeSelect 支持基本的键盘导航：

| 按键 | 功能 |
|------|------|
| ArrowDown / ArrowUp | 打开下拉面板 |
| Escape | 关闭下拉面板 |
| Backspace | 搜索框为空时，移除最后一个标签（多选） |

## 设计原则

### 推荐用法

```tsx
// 1. 层级树形数据使用 TreeSelect
<TreeSelect treeData={departmentTree} placeholder="请选择部门" />

// 2. 数据层级较多时启用搜索和默认展开
<TreeSelect treeData={treeData} showSearch treeDefaultExpandAll placeholder="搜索节点" />

// 3. 批量选择场景使用 treeCheckable
<TreeSelect treeCheckable treeData={treeData} showCheckedStrategy="SHOW_PARENT" placeholder="批量选择" />

// 4. 自定义字段名映射已有数据结构
<TreeSelect
  treeData={orgData}
  fieldNames={{ label: 'name', value: 'id', children: 'departments' }}
/>

// 5. 使用 treeLine 显示连接线增强层级感
<TreeSelect treeData={treeData} treeLine treeDefaultExpandAll placeholder="显示连接线" />
```

### 避免使用

```tsx
// 1. 不要用于扁平数据（应使用 Select）
<TreeSelect treeData={[{ value: 'a', title: 'A' }, { value: 'b', title: 'B' }]} />

// 2. 不要将 showSearch 和 loadData 同时使用（搜索结果不完整）
<TreeSelect treeData={treeData} showSearch loadData={loadChildren} />

// 3. 大数据量时避免默认全部展开（影响性能）
<TreeSelect treeData={hugeTreeData} treeDefaultExpandAll /> // 慎用
```

## 无障碍访问

TreeSelect 组件遵循 WAI-ARIA 规范：

- 选择器搜索框使用 `role="combobox"` + `aria-expanded` 表示展开状态
- 下拉面板使用 `role="listbox"`
- 支持 Tab 键聚焦、Escape 键关闭下拉
- 清除按钮带有 `aria-label="清除"` 语义标签
- 多选标签的删除按钮带有 `aria-label="移除 xxx"` 语义标签

## FAQ

### TreeSelect 和 Cascader 的区别？

`TreeSelect` 以树形结构展示数据，支持展开/收起节点，适合选择树中任意层级的节点。`Cascader` 以多列级联面板展示数据，每次只能逐级选择，适合固定路径选择（如省市区）。当数据层级灵活、需要勾选或搜索时，使用 `TreeSelect`。

### TreeSelect 和 Select 的区别？

`Select` 用于从扁平列表中选择一项或多项。`TreeSelect` 用于从具有树形层级关系的数据中选择，支持展开/收起、勾选等树特有功能。

### 如何异步加载子级数据？

通过 `loadData` 回调实现。需要预先在父级选项上设置 `isLeaf: false` 标记为非叶子节点：

```tsx
const treeData = [
  { value: 'root', title: '根节点', isLeaf: false },
];

const loadData = (treeNode) => {
  fetchChildren(treeNode.value).then(children => {
    // 更新 treeData 状态
  });
};

<TreeSelect treeData={treeData} loadData={loadData} />
```

### showCheckedStrategy 如何工作？

在 `treeCheckable` 模式下，`showCheckedStrategy` 控制多选标签的显示方式：

- `SHOW_ALL`：显示所有选中的节点
- `SHOW_PARENT`：当某节点的所有子节点都被选中时，只显示该父节点
- `SHOW_CHILD`：只显示叶子节点

```tsx
<TreeSelect
  treeCheckable
  showCheckedStrategy="SHOW_PARENT"
  treeData={treeData}
/>
```

### 如何自定义字段名？

通过 `fieldNames` 属性映射：

```tsx
<TreeSelect
  treeData={data}
  fieldNames={{ label: 'name', value: 'id', children: 'items' }}
/>
```

### 如何控制展开的节点？

使用 `treeExpandedKeys` 受控模式：

```tsx
const [expandedKeys, setExpandedKeys] = useState(['rd', 'fe']);

<TreeSelect
  treeData={treeData}
  treeExpandedKeys={expandedKeys}
  onTreeExpand={setExpandedKeys}
/>
```

## 相关资源

- [Select 选择器](/components/select) — 扁平数据选择
- [Cascader 级联选择](/components/cascader) — 级联路径选择
