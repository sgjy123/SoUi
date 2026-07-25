---
title: AutoComplete 自动完成
---

# AutoComplete 自动完成

输入建议，根据输入内容自动匹配选项。

## 何时使用

- 需要根据输入内容给出建议选项
- 搜索框、邮箱补全、城市选择等场景

## 代码示例

### 基础用法

```tsx
import { AutoComplete, useState } from '@soui/ui';

export default () => {
  const [options, setOptions] = useState([]);

  const handleSearch = (value) => {
    if (!value) {
      setOptions([]);
      return;
    }
    setOptions([
      { value: `${value}@gmail.com`, label: `${value}@gmail.com` },
      { value: `${value}@outlook.com`, label: `${value}@outlook.com` },
      { value: `${value}@qq.com`, label: `${value}@qq.com` },
    ]);
  };

  return (
    <AutoComplete
      options={options}
      onSearch={handleSearch}
      placeholder="输入邮箱前缀"
      style={{ width: 280 }}
      allowClear
    />
  );
};
```

### 本地过滤

```tsx
import { AutoComplete } from '@soui/ui';

export default () => {
  const options = [
    { value: 'React', label: 'React — JavaScript 库' },
    { value: 'Vue', label: 'Vue — 渐进式框架' },
    { value: 'Angular', label: 'Angular — 平台框架' },
    { value: 'Svelte', label: 'Svelte — 编译器' },
    { value: 'Solid', label: 'Solid — 响应式框架' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <AutoComplete
        options={options}
        placeholder="搜索前端框架（本地过滤）"
        style={{ width: 320 }}
        filterOption
      />
      <AutoComplete
        options={options}
        placeholder="禁用过滤（显示全部选项）"
        style={{ width: 320 }}
        filterOption={false}
      />
    </div>
  );
};
```

### 尺寸与状态

```tsx
import { AutoComplete } from '@soui/ui';

export default () => {
  const options = [
    { value: '选项 A' },
    { value: '选项 B' },
    { value: '选项 C', disabled: true },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <AutoComplete options={options} placeholder="小号" size="small" style={{ width: 240 }} />
      <AutoComplete options={options} placeholder="默认" style={{ width: 240 }} />
      <AutoComplete options={options} placeholder="大号" size="large" style={{ width: 240 }} />
      <AutoComplete options={options} placeholder="错误状态" status="error" style={{ width: 240 }} />
      <AutoComplete options={options} placeholder="警告状态" status="warning" style={{ width: 240 }} />
      <AutoComplete options={options} placeholder="禁用" disabled style={{ width: 240 }} />
    </div>
  );
};
```

### Form 表单集成

```tsx
import { AutoComplete, Form, Button } from '@soui/ui';

export default () => {
  const [form] = Form.useForm();
  const options = [
    { value: '北京市' },
    { value: '上海市' },
    { value: '广州市' },
    { value: '深圳市' },
    { value: '杭州市' },
  ];

  const onFinish = (values) => {
    console.log('表单值:', values);
  };

  return (
    <Form form={form} onFinish={onFinish} style={{ maxWidth: 400 }}>
      <Form.Item label="城市" name="city" rules={[{ required: true, message: '请选择城市' }]}>
        <AutoComplete options={options} placeholder="输入城市名" allowClear />
      </Form.Item>
      <Form.Item>
        <Button type="primary" onClick={() => form.submit()}>提交</Button>
      </Form.Item>
    </Form>
  );
};
```

## API

### AutoComplete

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 当前值 | string | - |
| defaultValue | 默认值 | string | `''` |
| options | 选项数据 | `(AutoCompleteOption \| string)[]` | `[]` |
| onChange | 值变化回调 | `(value: string) => void` | - |
| onSelect | 选中选项回调 | `(value: string, option: AutoCompleteOption) => void` | - |
| onSearch | 搜索回调 | `(value: string) => void` | - |
| onBlur | 失焦回调 | `(e: FocusEvent) => void` | - |
| onFocus | 聚焦回调 | `(e: FocusEvent) => void` | - |
| placeholder | 占位符 | string | - |
| disabled | 是否禁用 | boolean | `false` |
| allowClear | 允许清空 | boolean | `false` |
| filterOption | 是否本地过滤 | boolean \| `((input, option) => boolean)` | `true` |
| dropdownRender | 自定义下拉面板 | `(menu: ReactNode) => ReactNode` | - |
| notFoundContent | 空状态内容 | ReactNode | `'暂无数据'` |
| size | 尺寸 | `'small' \| 'middle' \| 'large'` | `'middle'` |
| status | 状态 | `'error' \| 'warning'` | - |
| prefix | 前缀图标 | ReactNode | - |

### AutoCompleteOption

| 属性 | 说明 | 类型 |
| --- | --- | --- |
| value | 选项值 | string |
| label | 选项标签 | ReactNode |
| disabled | 是否禁用 | boolean |

## 主题定制

通过 `ConfigProvider` 的 `theme.components.AutoComplete` 配置：

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| colorPrimary | 主色 | string | `'#1677ff'` |
| borderRadius | 圆角（像素） | number | `6` |
| fontSize | 字体大小（像素） | number | `14` |
| dropdownBg | 下拉面板背景色 | string | `'#fff'` |
