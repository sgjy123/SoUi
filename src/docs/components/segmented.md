# Segmented 分段控制器

分段控制器，用于在多个互斥选项之间进行切换，选中项以滑块形式高亮展示。

## 何时使用

- 需要在少量互斥选项间快速切换视图或状态时
- 选项数量较少（通常 2~5 个），适合一次性全部展示
- 相比 Radio 按钮组，希望提供更强的「分段切换」视觉反馈时

## 代码演示

### 基础用法

最简单的用法，默认选中第一个未禁用的选项。`options` 支持字符串数组或对象数组两种形式。

```tsx
import { Segmented } from '@soui/ui';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    <Segmented options={['日', '周', '月', '季', '年']} />
    <Segmented
      defaultValue="pending"
      options={[
        { label: '待处理', value: 'pending' },
        { label: '进行中', value: 'processing' },
        { label: '已完成', value: 'done' },
      ]}
    />
  </div>
);
```

### 尺寸

提供 `large`、`middle`（默认）、`small` 三种尺寸。

```tsx
import { Segmented } from '@soui/ui';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
    <Segmented size="large" options={['日', '周', '月']} />
    <Segmented size="middle" options={['日', '周', '月']} />
    <Segmented size="small" options={['日', '周', '月']} />
  </div>
);
```

### 撑满宽度

设置 `block` 后组件撑满父容器宽度，各选项等分。

```tsx
import { Segmented } from '@soui/ui';

export default () => (
  <Segmented block options={['日', '周', '月', '季', '年']} />
);
```

### 禁用

可以禁用整个组件，也可以禁用单个选项。

```tsx
import { Segmented } from '@soui/ui';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
    <Segmented
      defaultValue="month"
      options={[
        { label: '日', value: 'day' },
        { label: '周', value: 'week', disabled: true },
        { label: '月', value: 'month' },
      ]}
    />
    <Segmented disabled defaultValue="week" options={['日', '周', '月']} />
  </div>
);
```

### 带图标

通过选项的 `icon` 字段为选项添加图标，也可以只保留图标。

```tsx
import { Segmented, Icon } from '@soui/ui';

export default () => (
  <Segmented
    defaultValue="list"
    options={[
      { label: '列表', value: 'list', icon: <Icon name="List" size={14} /> },
      { label: '网格', value: 'grid', icon: <Icon name="GridTwo" size={14} /> },
      { label: '画廊', value: 'gallery', icon: <Icon name="Picture" size={14} /> },
    ]}
  />
);
```

### 受控模式

通过 `value` 和 `onChange` 实现受控使用。

```tsx
import { useState } from 'react';
import { Segmented } from '@soui/ui';

export default () => {
  const [value, setValue] = useState('day');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <span>当前值：{value}</span>
      <Segmented
        value={value}
        onChange={setValue}
        options={[
          { label: '日', value: 'day' },
          { label: '周', value: 'week' },
          { label: '月', value: 'month' },
        ]}
      />
    </div>
  );
};
```

### 配合 Form 使用

Segmented 可直接作为 `Form.Item` 的表单控件：`value` / `onChange` 由表单接管，`onBlur` 用于触发失焦校验，并自动跟随 Form 的 `size` 与 `disabled`。

```tsx
import { Form, Segmented, Button, Message } from '@soui/ui';

export default () => {
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{ view: 'list' }}
      onFinish={(values) => {
        Message.success('提交成功！');
        console.log(values);
      }}
    >
      <Form.Item name="view" label="视图模式">
        <Segmented
          options={[
            { label: '列表', value: 'list' },
            { label: '网格', value: 'grid' },
            { label: '画廊', value: 'gallery' },
          ]}
        />
      </Form.Item>
      <Button type="primary" htmlType="submit">提交</Button>
    </Form>
  );
};
```

## API

### 属性

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| options | 选项数据，支持字符串/数字或对象数组 | `Array<SegmentedOption \| string \| number>` | `[]` | - |
| value | 当前选中的值（受控） | `string \| number` | - | - |
| defaultValue | 默认选中的值 | `string \| number` | 首个未禁用选项 | - |
| onChange | 选中变化回调 | `(value: string \| number) => void` | - | - |
| size | 尺寸 | `'large' \| 'middle' \| 'small'` | `'middle'` | - |
| disabled | 是否禁用 | `boolean` | `false` | - |
| block | 是否撑满父容器宽度 | `boolean` | `false` | - |
| className | 自定义类名 | `string` | - | - |
| style | 自定义样式 | `CSSProperties` | - | - |

### SegmentedOption

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| label | 选项显示内容 | `ReactNode` | - |
| value | 选项值 | `string \| number` | - |
| icon | 选项图标 | `ReactNode` | - |
| disabled | 是否禁用该选项 | `boolean` | `false` |
| className | 选项自定义类名 | `string` | - |
| title | 原生 title 提示 | `string` | - |

## 主题定制

Segmented 作为标准 React 组件渲染在 ConfigProvider 的 DOM 树内，通过 CSS 变量继承自动获取主题配置，无需额外桥接。

### 组件级配置

通过 `theme.components.Segmented` 针对组件进行精细化配置：

```tsx
<ConfigProvider
  theme={{
    components: {
      Segmented: {
        trackBg: 'rgba(22, 119, 255, 0.08)',
        itemSelectedBg: '#1677ff',
        colorTextSelected: '#fff',
        borderRadius: 8,
      },
    },
  }}
>
  <Segmented options={['日', '周', '月']} />
</ConfigProvider>
```

### 配置优先级

配置优先级从高到低：

1. **Props (style/className)** - 直接传入的样式属性
2. **组件级配置** - `theme.components.Segmented` 中的配置
3. **CSS 变量** - 全局 CSS 自定义属性
4. **Less 变量** - 默认值

### 可用的主题配置项

| 配置项 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| colorPrimary | 主色（焦点环） | `string` | 主题主色 |
| trackBg | 轨道背景色 | `string` | `#f5f5f5` |
| itemSelectedBg | 选中项（滑块）背景色 | `string` | `#fff` |
| colorText | 默认文本颜色 | `string` | `rgba(0,0,0,0.65)` |
| colorTextSelected | 选中文本颜色 | `string` | `rgba(0,0,0,0.88)` |
| colorTextDisabled | 禁用文本颜色 | `string` | `rgba(0,0,0,0.25)` |
| borderRadius | 圆角（像素） | `number` | 主题圆角 |
| fontSize | 字体大小（像素） | `number` | 主题字号 |

## 无障碍访问

- 选项容器使用 `role="radiogroup"`，每个选项使用 `role="radio"` 并设置 `aria-checked`
- 支持键盘操作：`←` / `↑` 切换到上一项，`→` / `↓` 切换到下一项
- 禁用项设置 `aria-disabled` 且不可聚焦

## 相关资源

- [Radio 单选框](/components/radio)
- [Tabs 标签页](/components/tabs)
