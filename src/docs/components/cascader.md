# Cascader 级联选择

级联选择框，用于从一组相关联的数据集合中逐级选择。

## 何时使用

- 需要从一组具有层级关系的数据中选择时（如省市区、部门组织架构）
- 数据集合较大，需要通过逐级展开来缩小选择范围时
- 需要展示完整的层级路径信息时
- 替代多层嵌套的 Select 组件，提供更直观的层级选择体验
- 需要同时选择多个层级路径时（多选模式）

## 代码演示

### 基础用法

最基本的级联选择器，支持默认值、受控模式和禁用状态。

```tsx
import { useState } from 'react';
import { Cascader } from '@soui/ui';

const options = [
  {
    value: 'zhejiang',
    label: '浙江',
    children: [
      {
        value: 'hangzhou',
        label: '杭州',
        children: [
          { value: 'xihu', label: '西湖区' },
          { value: 'binjiang', label: '滨江区' },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: '江苏',
    children: [
      {
        value: 'nanjing',
        label: '南京',
        children: [
          { value: 'xuanwu', label: '玄武区' },
          { value: 'qinhuai', label: '秦淮区' },
        ],
      },
    ],
  },
];

export default () => {
  const [value, setValue] = useState([]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400 }}>
      <Cascader options={options} placeholder="请选择地址" onChange={setValue} />
      <Cascader options={options} defaultValue={['zhejiang', 'hangzhou', 'xihu']} placeholder="带默认值" />
      <Cascader options={options} disabled defaultValue={['zhejiang', 'hangzhou', 'xihu']} placeholder="禁用" />
    </div>
  );
};
```

### 选择即改变

通过 `changeOnSelect` 允许选择任意层级的选项，而非只能选择叶子节点。

```tsx
import { useState } from 'react';
import { Cascader } from '@soui/ui';

const options = [
  {
    value: 'zhejiang',
    label: '浙江',
    children: [
      { value: 'hangzhou', label: '杭州', children: [{ value: 'xihu', label: '西湖区' }] },
    ],
  },
];

export default () => {
  const [value, setValue] = useState([]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400 }}>
      <Cascader options={options} changeOnSelect value={value} onChange={setValue} placeholder="可选择父级" />
      <p>已选: {value.join(' / ') || '无'}</p>
    </div>
  );
};
```

### 多选

通过 `multiple` 启用多选模式，支持同时选择多个路径，配合 `maxTagCount` 控制标签显示数量。

```tsx
import { useState } from 'react';
import { Cascader } from '@soui/ui';

const options = [
  {
    value: 'zhejiang',
    label: '浙江',
    children: [
      { value: 'hangzhou', label: '杭州', children: [{ value: 'xihu', label: '西湖区' }, { value: 'binjiang', label: '滨江区' }] },
    ],
  },
  {
    value: 'jiangsu',
    label: '江苏',
    children: [
      { value: 'nanjing', label: '南京', children: [{ value: 'xuanwu', label: '玄武区' }] },
    ],
  },
];

export default () => {
  const [value, setValue] = useState([['zhejiang', 'hangzhou', 'xihu']]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 500 }}>
      <Cascader multiple options={options} value={value} onChange={setValue} placeholder="请选择地区" />
      <Cascader multiple options={options} maxTagCount={2} defaultValue={[['zhejiang', 'hangzhou', 'xihu'], ['zhejiang', 'hangzhou', 'binjiang'], ['jiangsu', 'nanjing', 'xuanwu']]} placeholder="限制标签数" />
    </div>
  );
};
```

### 搜索

通过 `showSearch` 启用搜索过滤，可以快速定位选项。`showSearch` 支持对象配置自定义过滤、排序和渲染逻辑。

```tsx
import { Cascader } from '@soui/ui';

const options = [
  {
    value: 'zhejiang',
    label: '浙江',
    children: [
      { value: 'hangzhou', label: '杭州', children: [{ value: 'xihu', label: '西湖区' }] },
      { value: 'ningbo', label: '宁波', children: [{ value: 'haishu', label: '海曙区' }] },
    ],
  },
];

export default () => (
  <div style={{ maxWidth: 400 }}>
    <Cascader options={options} showSearch placeholder="输入关键词搜索" />
  </div>
);
```

### 主题定制

通过 `ConfigProvider` 自定义 Cascader 的主题样式。

```tsx
import { Cascader, ConfigProvider } from '@soui/ui';

const options = [
  {
    value: 'zhejiang',
    label: '浙江',
    children: [
      { value: 'hangzhou', label: '杭州', children: [{ value: 'xihu', label: '西湖区' }] },
    ],
  },
];

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 400 }}>
    <ConfigProvider
      theme={{
        primaryColor: '#52c41a',
        components: { Cascader: { borderRadius: 8 } },
      }}
    >
      <Cascader options={options} defaultValue={['zhejiang', 'hangzhou', 'xihu']} placeholder="绿色主题" />
    </ConfigProvider>
    <ConfigProvider
      theme={{
        primaryColor: '#722ed1',
        components: { Cascader: { borderRadius: 10, colorBorder: '#d3adf7' } },
      }}
    >
      <Cascader options={options} defaultValue={['zhejiang', 'hangzhou', 'xihu']} placeholder="紫色主题" />
    </ConfigProvider>
  </div>
);
```

## API

### 属性

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| options | 可选项数据 | `CascaderOption[]` | `[]` |
| value | 指定选中的值（受控）。单选: `(string \| number)[]`，多选: `(string \| number)[][]` | `(string \| number)[] \| (string \| number)[][]` | - |
| defaultValue | 默认选中的值 | `(string \| number)[] \| (string \| number)[][]` | `[]` |
| onChange | 选中变化回调 | `(value, selectedOptions) => void` | - |
| multiple | 是否多选 | `boolean` | `false` |
| showCheckedStrategy | 多选时显示策略。`SHOW_PARENT` 显示父级路径，`SHOW_CHILD` 仅显示叶子路径 | `'SHOW_PARENT' \| 'SHOW_CHILD'` | `'SHOW_PARENT'` |
| changeOnSelect | 点选每一级是否都触发 onChange | `boolean` | `false` |
| disabled | 是否禁用 | `boolean` | `false` |
| allowClear | 是否显示清除按钮 | `boolean` | `true` |
| onClear | 清除回调 | `() => void` | - |
| placeholder | 占位文本 | `ReactNode` | - |
| prefix | 前缀内容 | `ReactNode` | - |
| size | 尺寸 | `'large' \| 'middle' \| 'small'` | `'middle'` |
| status | 校验状态 | `'error' \| 'warning'` | - |
| showSearch | 是否启用搜索。传入对象可自定义 filter/sort/render/limit | `boolean \| ShowSearchConfig` | `false` |
| expandTrigger | 子菜单展开方式 | `'click' \| 'hover'` | `'click'` |
| loadData | 异步加载子级数据 | `(selectedOptions) => void` | - |
| displayRender | 自定义显示渲染 | `(labels, selectedOptions) => ReactNode` | `labels => labels.join(' / ')` |
| optionRender | 自定义选项渲染 | `(option, info: { level, index }) => ReactNode` | - |
| popupRender | 自定义下拉菜单内容 | `(menus: ReactElement) => ReactElement` | - |
| notFoundContent | 空数据时显示的内容 | `ReactNode` | `'暂无数据'` |
| suffixIcon | 自定义后缀图标 | `ReactNode` | - |
| expandIcon | 自定义展开图标 | `ReactNode` | - |
| onDropdownVisibleChange | 下拉菜单展开/收起回调 | `(open: boolean) => void` | - |
| open | 控制下拉菜单显隐（受控） | `boolean` | - |
| defaultOpen | 默认下拉菜单显隐 | `boolean` | `false` |
| placement | 下拉菜单位置 | `'bottomLeft' \| 'bottomRight' \| 'topLeft' \| 'topRight'` | `'bottomLeft'` |
| fieldNames | 自定义字段名映射 | `{ label?: string; value?: string; children?: string }` | - |
| maxTagCount | 多选时最多显示的标签数量 | `number` | - |
| maxTagPlaceholder | 多选时隐藏标签的占位 | `ReactNode \| ((omittedValues) => ReactNode)` | - |
| tagRender | 自定义标签渲染 | `(props: { label, value, onClose }) => ReactNode` | - |

### ShowSearchConfig

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| filter | 自定义搜索过滤逻辑 | `(inputValue: string, path: CascaderOption[], fieldNames?) => boolean` | 模糊匹配 label |
| sort | 自定义搜索结果排序 | `(a: CascaderOption[], b: CascaderOption[], inputValue: string) => number` | - |
| render | 自定义搜索结果渲染 | `(inputValue: string, path: CascaderOption[]) => ReactNode` | 高亮匹配文本 |
| limit | 搜索结果数量限制 | `number \| false` | - |

### CascaderOption

```typescript
interface CascaderOption {
  value: string | number;
  label?: ReactNode;
  children?: CascaderOption[];
  disabled?: boolean;
  isLeaf?: boolean;
  [key: string]: any;
}
```

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| value | 选项值（必填） | `string \| number` | - |
| label | 显示文本 | `ReactNode` | - |
| children | 子级选项 | `CascaderOption[]` | - |
| disabled | 是否禁用 | `boolean` | `false` |
| isLeaf | 是否为叶子节点（异步加载时标记） | `boolean` | - |

### CascaderRef

| 方法 | 说明 |
|------|------|
| focus | 聚焦 |
| blur | 失焦 |

### Cascader.Panel

内嵌面板模式，以静态方式渲染级联选择面板，不带下拉和输入框。

```tsx
import { Cascader } from '@soui/ui';

<Cascader.Panel
  options={options}
  onChange={(value, selectedOptions) => console.log(value)}
/>
```

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| options | 可选项数据 | `CascaderOption[]` | `[]` |
| value | 指定选中的值（受控） | `(string \| number)[]` | - |
| defaultValue | 默认选中的值 | `(string \| number)[]` | `[]` |
| onChange | 选中变化回调 | `(value, selectedOptions) => void` | - |
| changeOnSelect | 点选每一级是否都触发 onChange | `boolean` | `false` |
| expandTrigger | 子菜单展开方式 | `'click' \| 'hover'` | `'click'` |
| loadData | 异步加载子级数据 | `(selectedOptions) => void` | - |
| fieldNames | 自定义字段名映射 | `CascaderFieldNames` | - |
| optionRender | 自定义选项渲染 | `(option, info: { level, index }) => ReactNode` | - |

## 主题定制

Cascader 组件支持通过 ConfigProvider 进行主题定制，遵循 SoUi 三层设计令牌系统。

Cascader 使用 `ReactDOM.createPortal` 将下拉面板渲染在 `document.body` 上，位于 ConfigProvider 的 DOM 树之外。通过 DOM 桥接机制（`getComputedStyle` 读取 `.soui-config-provider` 上的 CSS 变量并复制到 Portal 容器）来实现主题同步。

### 组件级配置

通过 `theme.components.Cascader` 针对组件进行精细化配置：

```tsx
<ConfigProvider
  theme={{
    components: {
      Cascader: {
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
      },
    },
  }}
>
  <Cascader options={options} placeholder="请选择" />
</ConfigProvider>
```

### 配置优先级

配置优先级从高到低：

1. **Props (style/className)** - 直接传入的样式属性
2. **组件级配置** - `theme.components.Cascader` 中的配置
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
<Cascader
  options={options}
  style={{
    '--soui-cascader-border-radius': '10px',
    '--soui-cascader-option-selected-bg': 'rgba(82, 196, 26, 0.08)',
  }}
/>
```

## 键盘操作

Cascader 支持完整的键盘导航：

| 按键 | 功能 |
|------|------|
| ArrowDown / ArrowUp | 在当前列内上下移动选项 |
| ArrowRight | 移动到下一列（展开子级） |
| ArrowLeft | 返回上一列 |
| Enter | 选中当前项 / 打开下拉面板 |
| Escape | 关闭下拉面板 |
| Backspace | 搜索框为空时，移除最后一个标签（多选）或清空选择（单选） |

## 设计原则

### 推荐用法

```tsx
// 1. 层级数据使用 Cascader 而非嵌套 Select
<Cascader options={provinceOptions} placeholder="请选择地区" />

// 2. 数据层级较多时启用搜索
<Cascader options={options} showSearch placeholder="搜索地区" />

// 3. 异步加载大量数据
<Cascader options={options} loadData={loadChildren} changeOnSelect />

// 4. 自定义字段名映射已有数据结构
<Cascader
  options={treeData}
  fieldNames={{ label: 'name', value: 'id', children: 'items' }}
/>

// 5. 多选场景
<Cascader options={options} multiple maxTagCount={3} placeholder="选择多个地区" />
```

### 避免使用

```tsx
// 1. 不要用于扁平数据（应使用 Select）
<Cascader options={[{ value: 'a', label: 'A' }, { value: 'b', label: 'B' }]} />

// 2. 不要将 showSearch 和 loadData 同时使用（搜索结果不完整）
<Cascader options={options} showSearch loadData={loadChildren} />
```

## 无障碍访问

Cascader 组件遵循 WAI-ARIA 规范：

- 选择器使用 `role="combobox"` + `aria-expanded` 表示展开状态
- 下拉面板使用 `role="listbox"`，选项使用 `role="option"`
- 支持 Tab 键聚焦、Enter 键打开下拉、Escape 键关闭
- 完整的方向键导航支持（上下左右）
- `aria-selected` 标识已选中的选项
- `aria-disabled` 标识禁用的选项
- 清除按钮带有 `aria-label="清除"` 语义标签
- 多选标签的删除按钮带有 `aria-label="移除 xxx"` 语义标签

## FAQ

### Cascader 和 Select 的区别？

`Cascader` 用于从具有层级关系的数据中逐级选择，展示为多列级联面板。`Select` 用于从扁平列表中选择一项或多项。当数据具有明确的父子层级关系时，使用 `Cascader` 更直观。

### 如何异步加载子级数据？

通过 `loadData` 回调实现。需要预先在父级选项上设置 `isLeaf: false` 标记为非叶子节点：

```tsx
const options = [
  { value: 'zj', label: '浙江', isLeaf: false },
];

const loadData = (selectedOptions) => {
  fetchChildren(selectedOptions).then(children => {
    // 更新 options 状态
  });
};

<Cascader options={options} loadData={loadData} changeOnSelect />
```

### 多选模式下的值格式是什么？

单选模式的 `value` 是单条路径 `(string | number)[]`，多选模式的 `value` 是路径数组 `(string | number)[][]`：

```tsx
// 单选
<Cascader value={['zhejiang', 'hangzhou', 'xihu']} />

// 多选
<Cascader multiple value={[
  ['zhejiang', 'hangzhou', 'xihu'],
  ['jiangsu', 'nanjing', 'xuanwu'],
]} />
```

### 如何自定义搜索逻辑？

`showSearch` 支持对象形式配置，可以自定义 `filter`、`sort`、`render` 和 `limit`：

```tsx
<Cascader
  options={options}
  showSearch={{
    filter: (inputValue, path) => {
      // 自定义过滤逻辑
      return path.some(opt => opt.label.includes(inputValue));
    },
    limit: 10, // 限制搜索结果数量
  }}
/>
```

### 如何自定义字段名？

通过 `fieldNames` 属性映射：

```tsx
<Cascader
  options={data}
  fieldNames={{ label: 'name', value: 'id', children: 'items' }}
/>
```

### Cascader.Panel 是什么？

`Cascader.Panel` 是内嵌面板模式，以静态方式渲染级联面板，不包含输入框和下拉逻辑。适合嵌入自定义容器或表单中使用：

```tsx
<Cascader.Panel options={options} onChange={handleChange} />
```

## 相关资源

- [Select 选择器](/components/select) — 扁平数据选择
- [TreeSelect 树选择](/components/tree-select) — 树形数据选择
