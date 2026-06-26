# Select 选择器

下拉选择器，用于在一组选项中选择一个或多个值。

## 何时使用

- 需要从一组选项中选择一个或多个值时
- 选项数量较多，不适合使用 Radio 或 Checkbox 时
- 需要搜索功能快速定位选项时
- 需要对选项进行分组展示时
- 需要用户自由输入标签（Tags 模式）时

## 代码演示

### 基础用法

最基本的选择器用法，支持默认值和禁用状态。

```tsx
import { Select } from '@soui/ui';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 300 }}>
    <Select
      placeholder="请选择一个选项"
      options={[
        { label: '选项一', value: 'option1' },
        { label: '选项二', value: 'option2' },
        { label: '选项三', value: 'option3' },
      ]}
    />
    <Select
      placeholder="带默认值"
      defaultValue="option2"
      options={[
        { label: '选项一', value: 'option1' },
        { label: '选项二', value: 'option2' },
        { label: '选项三', value: 'option3' },
      ]}
    />
    <Select
      placeholder="禁用状态"
      disabled
      options={[
        { label: '选项一', value: 'option1' },
        { label: '选项二', value: 'option2' },
      ]}
    />
  </div>
);
```

### 多选模式

通过 `mode="multiple"` 启用多选，支持标签式展示和删除。

```tsx
import { Select } from '@soui/ui';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400 }}>
    <Select
      mode="multiple"
      placeholder="请选择多个选项"
      options={[
        { label: 'React', value: 'react' },
        { label: 'Vue', value: 'vue' },
        { label: 'Angular', value: 'angular' },
        { label: 'Svelte', value: 'svelte' },
      ]}
    />
    <Select
      mode="multiple"
      placeholder="带默认值的多选"
      defaultValue={['react', 'vue']}
      options={[
        { label: 'React', value: 'react' },
        { label: 'Vue', value: 'vue' },
        { label: 'Angular', value: 'angular' },
      ]}
    />
  </div>
);
```

### 带搜索

通过 `showSearch` 启用搜索功能，支持自定义过滤逻辑。

```tsx
import { Select } from '@soui/ui';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 300 }}>
    <Select
      showSearch
      placeholder="搜索选项"
      options={[
        { label: '苹果', value: 'apple' },
        { label: '香蕉', value: 'banana' },
        { label: '橙子', value: 'orange' },
        { label: '葡萄', value: 'grape' },
      ]}
    />
    <Select
      showSearch
      mode="multiple"
      placeholder="多选 + 搜索"
      options={[
        { label: 'JavaScript', value: 'js' },
        { label: 'TypeScript', value: 'ts' },
        { label: 'Python', value: 'py' },
        { label: 'Rust', value: 'rs' },
      ]}
    />
  </div>
);
```

### 禁用状态

可以禁用整个选择器，也可以禁用单个选项。

```tsx
import { Select } from '@soui/ui';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 300 }}>
    <Select
      placeholder="禁用选择器"
      disabled
      options={[
        { label: '选项一', value: 'option1' },
        { label: '选项二', value: 'option2' },
      ]}
    />
    <Select
      placeholder="部分选项禁用"
      options={[
        { label: '可选择', value: 'enabled' },
        { label: '不可选择', value: 'disabled', disabled: true },
        { label: '可选择', value: 'enabled2' },
      ]}
    />
  </div>
);
```

### 不同尺寸

选择器有大（large）、中（middle）、小（small）三种尺寸。

```tsx
import { Select } from '@soui/ui';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 300 }}>
    <Select
      size="small"
      placeholder="小尺寸"
      options={[{ label: '选项一', value: '1' }, { label: '选项二', value: '2' }]}
    />
    <Select
      size="middle"
      placeholder="中尺寸（默认）"
      options={[{ label: '选项一', value: '1' }, { label: '选项二', value: '2' }]}
    />
    <Select
      size="large"
      placeholder="大尺寸"
      options={[{ label: '选项一', value: '1' }, { label: '选项二', value: '2' }]}
    />
  </div>
);
```

### 受控模式

通过 `value` 和 `onChange` 实现受控选择器。

```tsx
import { useState } from 'react';
import { Select, Button, Space } from '@soui/ui';

export default () => {
  const [value, setValue] = useState('option1');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400 }}>
      <p>当前值：{value || '无'}</p>
      <Select
        value={value}
        onChange={(val) => setValue(val)}
        options={[
          { label: '选项一', value: 'option1' },
          { label: '选项二', value: 'option2' },
          { label: '选项三', value: 'option3' },
        ]}
      />
      <Space>
        <Button size="small" onClick={() => setValue('option1')}>选项一</Button>
        <Button size="small" onClick={() => setValue('option2')}>选项二</Button>
        <Button size="small" onClick={() => setValue('')}>清空</Button>
      </Space>
    </div>
  );
};
```

### 状态校验

通过 `status` 设置校验状态，支持 `error` 和 `warning` 两种状态。

```tsx
import { Select } from '@soui/ui';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 300 }}>
    <Select
      placeholder="error 状态"
      status="error"
      options={[
        { label: '选项一', value: 'option1' },
        { label: '选项二', value: 'option2' },
      ]}
    />
    <Select
      placeholder="warning 状态"
      status="warning"
      defaultValue="option1"
      options={[
        { label: '选项一', value: 'option1' },
        { label: '选项二', value: 'option2' },
      ]}
    />
  </div>
);
```

### 可清空

通过 `allowClear` 启用清空按钮，hover 时显示清除图标。

```tsx
import { Select } from '@soui/ui';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 300 }}>
    <Select
      placeholder="单选可清空"
      allowClear
      defaultValue="option1"
      options={[
        { label: '选项一', value: 'option1' },
        { label: '选项二', value: 'option2' },
        { label: '选项三', value: 'option3' },
      ]}
    />
    <Select
      mode="multiple"
      placeholder="多选可清空"
      allowClear
      defaultValue={['option1', 'option2']}
      options={[
        { label: '选项一', value: 'option1' },
        { label: '选项二', value: 'option2' },
        { label: '选项三', value: 'option3' },
      ]}
    />
  </div>
);
```

### 分组选项

通过 `options` 中的分组结构，将选项按类别分组展示。普通选项和分组可以混合使用。

```tsx
import { Select } from '@soui/ui';
import type { GroupedOptionType } from '@soui/ui';

export default () => {
  const groupedOptions: GroupedOptionType[] = [
    {
      label: '热门城市',
      children: [
        { label: '北京', value: 'beijing' },
        { label: '上海', value: 'shanghai' },
        { label: '广州', value: 'guangzhou' },
        { label: '深圳', value: 'shenzhen' },
      ],
    },
    {
      label: '其他城市',
      children: [
        { label: '杭州', value: 'hangzhou' },
        { label: '南京', value: 'nanjing' },
        { label: '成都', value: 'chengdu' },
      ],
    },
  ];

  return (
    <div style={{ maxWidth: 300 }}>
      <Select
        placeholder="请选择城市"
        options={groupedOptions}
        showSearch
      />
    </div>
  );
};
```

### 标签溢出（maxTagCount）

多选模式下通过 `maxTagCount` 限制可见标签数量，超出的以 `+N` 形式展示。

```tsx
import { Select } from '@soui/ui';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400 }}>
    <Select
      mode="multiple"
      maxTagCount={2}
      defaultValue={['react', 'vue', 'angular', 'svelte']}
      options={[
        { label: 'React', value: 'react' },
        { label: 'Vue', value: 'vue' },
        { label: 'Angular', value: 'angular' },
        { label: 'Svelte', value: 'svelte' },
      ]}
    />
    <Select
      mode="multiple"
      maxTagCount={3}
      defaultValue={['react', 'vue', 'angular', 'svelte', 'solid']}
      options={[
        { label: 'React', value: 'react' },
        { label: 'Vue', value: 'vue' },
        { label: 'Angular', value: 'angular' },
        { label: 'Svelte', value: 'svelte' },
        { label: 'Solid', value: 'solid' },
      ]}
    />
  </div>
);
```

### Tags 模式（动态创建）

`mode="tags"` 时，用户可以输入不在列表中的内容并按回车创建新标签。

```tsx
import { useState } from 'react';
import { Select } from '@soui/ui';

export default () => {
  const [tags, setTags] = useState<string[]>(['React', 'Vue']);

  return (
    <div style={{ maxWidth: 400 }}>
      <Select
        mode="tags"
        placeholder="输入标签后按回车"
        value={tags}
        onChange={(val) => setTags(val as string[])}
        options={[
          { label: 'React', value: 'React' },
          { label: 'Vue', value: 'Vue' },
          { label: 'Angular', value: 'Angular' },
        ]}
        showSearch
      />
      <p style={{ marginTop: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>
        当前标签：{tags.join(', ')}
      </p>
    </div>
  );
};
```

### 自定义渲染

通过 `suffixIcon` 自定义后缀图标，`optionRender` 自定义选项渲染，`dropdownRender` 自定义下拉菜单内容。

```tsx
import { Select, Divider } from '@soui/ui';
import Icon from '@soui/ui/components/Icon';

export default () => {
  const options = [
    { label: '选项一', value: 'option1' },
    { label: '选项二', value: 'option2' },
    { label: '选项三', value: 'option3' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 300 }}>
      {/* 自定义后缀图标 */}
      <Select
        placeholder="自定义图标"
        suffixIcon={<Icon name="ColorFilter" size={14} theme="outline" />}
        options={options}
      />

      {/* 自定义选项渲染 */}
      <Select
        placeholder="带描述的选项"
        optionRender={(option) => (
          <div>
            <div style={{ fontWeight: 500 }}>{option.label}</div>
            <div style={{ fontSize: 12, color: 'rgba(0,0,0,0.45)' }}>
              这是 {option.label} 的描述
            </div>
          </div>
        )}
        options={options}
      />

      {/* 自定义下拉菜单 */}
      <Select
        placeholder="底部带操作按钮"
        options={options}
        dropdownRender={(menu) => (
          <>
            {menu}
            <Divider style={{ margin: '4px 0' }} />
            <div style={{ padding: '4px 12px 8px', textAlign: 'center' }}>
              <a href="#" onClick={(e) => e.preventDefault()}>+ 添加新选项</a>
            </div>
          </>
        )}
      />
    </div>
  );
};
```

### 主题定制

通过 `ConfigProvider` 自定义 Select 的主题样式。

```tsx
import { Select, ConfigProvider } from '@soui/ui';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    <ConfigProvider
      theme={{
        primaryColor: '#52c41a',
        components: {
          Select: {
            borderRadius: 10,
            optionSelectedBg: 'rgba(82, 196, 26, 0.1)',
          },
        },
      }}
    >
      <div style={{ maxWidth: 300 }}>
        <Select
          placeholder="绿色主题"
          defaultValue="option1"
          options={[
            { label: '选项一', value: 'option1' },
            { label: '选项二', value: 'option2' },
          ]}
        />
      </div>
    </ConfigProvider>

    <ConfigProvider
      theme={{
        primaryColor: '#722ed1',
        components: {
          Select: {
            colorBorder: '#d3adf7',
            colorBorderHover: '#b37feb',
            colorBorderFocus: '#722ed1',
            tagBg: '#f9f0ff',
          },
        },
      }}
    >
      <div style={{ maxWidth: 300 }}>
        <Select
          mode="multiple"
          placeholder="紫色主题多选"
          defaultValue={['option1', 'option2']}
          options={[
            { label: '选项一', value: 'option1' },
            { label: '选项二', value: 'option2' },
            { label: '选项三', value: 'option3' },
          ]}
        />
      </div>
    </ConfigProvider>
  </div>
);
```

## API

### Select

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| value | 指定当前选中的值 | `string \| string[]` | - |
| defaultValue | 默认选中的值 | `string \| string[]` | - |
| onChange | 选中值变化时的回调 | `(value: string \| string[], option?: OptionType \| OptionType[]) => void` | - |
| mode | 选择模式：`multiple` 多选，`tags` 标签（支持创建新选项） | `'multiple' \| 'tags'` | - |
| options | 选项数据，支持分组 | `GroupedOptionType[]` | `[]` |
| placeholder | 占位文本 | `ReactNode` | - |
| disabled | 是否禁用 | `boolean` | `false` |
| loading | 是否加载中 | `boolean` | `false` |
| allowClear | 是否显示清除按钮 | `boolean` | `false` |
| showSearch | 是否启用搜索 | `boolean` | `false` |
| filterOption | 搜索过滤函数，设为 `false` 关闭本地过滤 | `boolean \| ((inputValue: string, option: OptionType) => boolean)` | `true` |
| onSearch | 搜索值变化回调 | `(value: string) => void` | - |
| size | 尺寸 | `'large' \| 'middle' \| 'small'` | `'middle'` |
| status | 校验状态 | `'error' \| 'warning'` | - |
| maxTagCount | 多选时最多显示的标签数量，超出以 `+N` 展示 | `number` | - |
| dropdownMatchSelectWidth | 下拉菜单宽度是否与选择器一致 | `boolean \| number` | `true` |
| dropdownRender | 自定义下拉菜单内容 | `(menu: ReactElement) => ReactElement` | - |
| optionRender | 自定义选项渲染 | `(option: OptionType, index: number) => ReactNode` | - |
| suffixIcon | 自定义后缀图标 | `ReactNode` | - |
| notFoundContent | 空选项时的内容 | `ReactNode` | `'暂无数据'` |
| onFocus | 获得焦点时的回调 | `(e: FocusEvent) => void` | - |
| onBlur | 失去焦点时的回调 | `(e: FocusEvent) => void` | - |
| onDropdownVisibleChange | 下拉菜单展开/收起回调 | `(open: boolean) => void` | - |
| dropdownClassName | 下拉菜单自定义类名 | `string` | - |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |

### OptionType

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| label | 选项显示文本 | `ReactNode` | - |
| value | 选项值 | `string` | - |
| disabled | 是否禁用 | `boolean` | `false` |
| children | 分组子选项（存在时表示这是一个分组） | `OptionType[]` | - |

### OptionGroupType

用于定义选项分组，通常作为 `options` 数组的元素使用。

| 参数 | 说明 | 类型 |
|------|------|------|
| label | 分组标签 | `ReactNode` |
| children | 分组内的子选项 | `OptionType[]` |

### GroupedOptionType

`OptionType` 和 `OptionGroupType` 的联合类型：

```ts
type GroupedOptionType = OptionType | OptionGroupType;
```

`options` 数组中可以混合使用普通选项和分组，例如：

```tsx
const options: GroupedOptionType[] = [
  { label: '全部', value: 'all' },           // 普通选项
  {
    label: '分组 A',                          // 分组
    children: [
      { label: '选项 A1', value: 'a1' },
      { label: '选项 A2', value: 'a2' },
    ],
  },
];
```

### SelectRef

通过 `ref` 可以获取以下方法：

| 方法名 | 说明 |
|--------|------|
| focus() | 聚焦搜索输入框 |
| blur() | 失焦并关闭下拉 |
| clear() | 清空已选值 |

## 主题定制

Select 组件支持全局主题和组件级主题定制，通过 CSS 变量实现样式覆盖。

Select 作为标准 React 组件渲染在 ConfigProvider 的 DOM 树内，通过 CSS 变量继承自动获取主题配置。下拉面板使用 Portal 渲染到 `document.body`，通过 DOM 桥接机制同步主题变量。

### 组件级主题

通过 `ConfigProvider` 的 `theme.components.Select` 配置：

```tsx
import { ConfigProvider, Select } from '@soui/ui';

function App() {
  return (
    <ConfigProvider
      theme={{
        components: {
          Select: {
            borderRadius: 8,
            fontSize: 16,
            controlHeight: 36,
            colorBorder: '#d9d9d9',
            colorBorderHover: '#4096ff',
            colorBorderFocus: '#1677ff',
            colorBg: '#ffffff',
            colorText: '#000000',
            dropdownBg: '#ffffff',
            optionActiveBg: 'rgba(0, 0, 0, 0.04)',
            optionSelectedBg: 'rgba(22, 119, 255, 0.08)',
            tagBg: '#fafafa',
          },
        },
      }}
    >
      <Select
        placeholder="自定义主题选择器"
        options={[{ label: '选项一', value: '1' }]}
      />
    </ConfigProvider>
  );
}
```

### 组件级主题配置项

| 配置项 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| borderRadius | 选择器圆角（单位 px） | `number` | 继承全局 `borderRadius`（6） |
| fontSize | 字体大小（单位 px） | `number` | 继承全局 `fontSize`（14） |
| controlHeight | 控件高度（单位 px） | `number` | 32 |
| colorBorder | 边框颜色 | `string` | `#d9d9d9` |
| colorBorderHover | 悬停边框颜色 | `string` | `#4096ff` |
| colorBorderFocus | 聚焦边框颜色 | `string` | `#1677ff` |
| colorBg | 背景颜色 | `string` | `#ffffff` |
| colorText | 文字颜色 | `string` | `rgba(0, 0, 0, 0.88)` |
| colorBgDisabled | 禁用背景颜色 | `string` | `#f5f5f5` |
| colorTextDisabled | 禁用文字颜色 | `string` | `rgba(0, 0, 0, 0.25)` |
| colorError | 错误状态颜色 | `string` | `#ff4d4f` |
| colorWarning | 警告状态颜色 | `string` | `#faad14` |
| dropdownBg | 下拉面板背景色 | `string` | `#ffffff` |
| optionActiveBg | 选项悬停背景色 | `string` | `rgba(0, 0, 0, 0.04)` |
| optionSelectedBg | 选项选中背景色 | `string` | `rgba(22, 119, 255, 0.08)` |
| tagBg | 多选标签背景色 | `string` | `#fafafa` |

### 优先级

CSS 变量的优先级从高到低：

1. **组件级主题** (`theme.components.Select.*`) — 通过 `--soui-select-*` CSS 变量注入
2. **全局主题** (`theme.*`) — `borderRadius`、`fontSize` 可从全局继承
3. **Less 变量** (`variables.less`) — 最终回退值

## 设计原则

### 推荐用法

```tsx
// 1. 多选时使用 mode="multiple" 而非手动管理多个 Select
<Select mode="multiple" options={options} />

// 2. 选项多时启用搜索
<Select showSearch options={manyOptions} />

// 3. 受控模式下始终提供 value 和 onChange
<Select value={value} onChange={setValue} options={options} />

// 4. 配合 allowClear 方便用户清空选择
<Select allowClear options={options} />

// 5. 选项数量过多时使用 maxTagCount 控制标签溢出
<Select mode="multiple" maxTagCount={3} options={options} />

// 6. 有分类意义的选项使用分组展示
<Select options={[
  { label: '全部', value: 'all' },
  { label: '分组', children: [...] },
]} />
```

### 避免使用

```tsx
// 1. 选项少于 3 个时考虑使用 Radio
// 2. 避免在 options 中使用重复的 value
<Select options={[
  { label: '选项一', value: 'same' },
  { label: '选项二', value: 'same' },  // value 重复
]} />

// 3. Tags 模式下创建的值在重新打开后不会保留在选项列表中
//    如需持久化，请将新创建的值合并到 options
```

## 无障碍访问

Select 组件遵循 WAI-ARIA 规范：

- 搜索输入框带有 `role="combobox"` 和 `aria-expanded` 属性
- 下拉面板带有 `role="listbox"` 属性
- 选项带有 `role="option"` 和 `aria-selected` 属性
- 分组带有 `role="group"` 属性
- 禁用选项带有 `aria-disabled` 属性
- 清除按钮带有 `role="button"` 和 `aria-label="清除"`
- 多选标签的删除按钮带有 `aria-label` 说明
- 支持完整的键盘导航：方向键移动、Enter 选择/创建、Escape 关闭、Backspace 删除多选标签

## FAQ

### 如何自定义搜索过滤逻辑？

```tsx
<Select
  showSearch
  filterOption={(input, option) =>
    (option.label as string).toLowerCase().includes(input.toLowerCase())
  }
  options={options}
/>
```

### 如何实现远程搜索？

```tsx
const [options, setOptions] = useState([]);

<Select
  showSearch
  filterOption={false}
  onSearch={async (value) => {
    const result = await fetchOptions(value);
    setOptions(result);
  }}
  options={options}
/>
```

### 多选模式下如何限制最大选择数量？

```tsx
const MAX = 3;

<Select
  mode="multiple"
  value={value}
  onChange={(val) => {
    if ((val as string[]).length <= MAX) setValue(val as string[]);
  }}
  options={options}
/>
```

### 如何自定义空选项展示？

```tsx
<Select
  notFoundContent={<div>暂无可选数据</div>}
  options={[]}
/>
```

### 分组选项如何使用？

`options` 支持混合普通选项和分组结构。分组对象需要 `label` 和 `children` 两个字段：

```tsx
import type { GroupedOptionType } from '@soui/ui';

const options: GroupedOptionType[] = [
  { label: '全部', value: 'all' },
  {
    label: '前端框架',
    children: [
      { label: 'React', value: 'react' },
      { label: 'Vue', value: 'vue' },
    ],
  },
  {
    label: '后端框架',
    children: [
      { label: 'Express', value: 'express' },
      { label: 'Koa', value: 'koa' },
    ],
  },
];

<Select options={options} showSearch />
```

搜索时会自动过滤分组内的选项，空分组会自动隐藏。

### Tags 模式和 Multiple 模式有什么区别？

`mode="multiple"` 只能从已有选项中选择，而 `mode="tags"` 允许用户输入新内容并按回车创建标签。在 Tags 模式下：

- 输入不存在于列表中的文字后按 Enter 会自动创建新标签
- 下拉菜单会显示"创建 xxx"的提示
- 新创建的标签的 `label` 和 `value` 相同

### 如何在下拉菜单底部添加自定义内容？

使用 `dropdownRender` 包裹默认的菜单内容：

```tsx
import { Select, Divider, Button } from '@soui/ui';

<Select
  options={options}
  dropdownRender={(menu) => (
    <>
      {menu}
      <Divider style={{ margin: '4px 0' }} />
      <div style={{ padding: '8px', textAlign: 'center' }}>
        <Button size="small" type="link" onClick={handleAdd}>+ 添加选项</Button>
      </div>
    </>
  )}
/>
```

## 相关资源

- [Input 输入框](/components/input) — 文本输入组件
- [Button 按钮](/components/button) — 配合受控模式使用
