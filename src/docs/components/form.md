# Form 表单

高性能表单组件，支持数据校验、布局配置和主题定制。

## 何时使用

- 需要采集用户表单数据时
- 需要对输入内容进行校验时
- 需要灵活控制表单布局时

## 代码演示

### 基础用法

水平布局表单，最常见的表单使用方式。通过 `labelCol` 和 `wrapperCol` 控制标签和控件的宽度比例。

```tsx
import { Form, Input, Button, Radio, Space, Message } from '@soui/ui';

const BasicForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    Message.success('提交成功！');
    console.log(values);
  };

  return (
    <Form
      form={form}
      layout="horizontal"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      initialValues={{ gender: 'male' }}
      onFinish={onFinish}
    >
      <Form.Item name="username" label="用户名" rules={[{ required: true, message: '请输入用户名' }]}>
        <Input placeholder="请输入用户名" />
      </Form.Item>
      <Form.Item name="password" label="密码" rules={[{ required: true, message: '请输入密码' }]}>
        <Input.Password placeholder="请输入密码" />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
        <Space>
          <Button type="primary" htmlType="submit">提交</Button>
          <Button onClick={() => form.resetFields()}>重置</Button>
        </Space>
      </Form.Item>
    </Form>
  );
};
```

### 垂直布局

标签在输入框上方，适合移动端或窄屏场景。

```tsx
<Form layout="vertical" onFinish={(values) => console.log(values)}>
  <Form.Item name="name" label="姓名" rules={[{ required: true }]}>
    <Input placeholder="请输入姓名" />
  </Form.Item>
  <Form.Item name="email" label="邮箱">
    <Input placeholder="请输入邮箱" />
  </Form.Item>
</Form>
```

### 行内布局

所有字段在一行内显示，常用于登录表单。

```tsx
<Form layout="inline" onFinish={(values) => console.log(values)}>
  <Form.Item name="username" rules={[{ required: true }]}>
    <Input placeholder="用户名" />
  </Form.Item>
  <Form.Item name="password" rules={[{ required: true }]}>
    <Input.Password placeholder="密码" />
  </Form.Item>
  <Form.Item>
    <Button type="primary" htmlType="submit">登录</Button>
  </Form.Item>
</Form>
```

### 校验规则

支持多种校验规则：必填、长度限制、正则、邮箱、URL、自定义校验器等。

```tsx
<Form layout="vertical" onFinish={(v) => Message.success('校验通过！')}>
  <Form.Item name="username" label="用户名" rules={[
    { required: true, message: '用户名不能为空' },
    { min: 3, max: 20, message: '3-20个字符' },
    { pattern: /^[a-zA-Z0-9_]+$/, message: '只能包含字母、数字和下划线' },
  ]}>
    <Input placeholder="3-20位字母、数字或下划线" />
  </Form.Item>
  <Form.Item name="email" label="邮箱" rules={[
    { required: true, message: '邮箱不能为空' },
    { type: 'email', message: '请输入有效的邮箱' },
  ]}>
    <Input placeholder="example@email.com" />
  </Form.Item>
</Form>
```

### 动态字段

使用 `Form.List` 动态增删表单字段，适用于联系人列表、地址列表等场景。

```tsx
<Form initialValues={{ contacts: [{ name: '', phone: '' }] }}>
  <Form.List name="contacts">
    {(fields, { add, remove }) => (
      <>
        {fields.map((field) => (
          <div key={field.key} style={{ display: 'flex', gap: 8 }}>
            <Form.Item name={[field.name, 'name']} noStyle>
              <Input placeholder="姓名" />
            </Form.Item>
            <Form.Item name={[field.name, 'phone']} noStyle>
              <Input placeholder="手机号" />
            </Form.Item>
            <Button onClick={() => remove(field.name)}>删除</Button>
          </div>
        ))}
        <Button onClick={() => add({ name: '', phone: '' })}>+ 添加</Button>
      </>
    )}
  </Form.List>
</Form>
```

## API

### Form

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| layout | 表单布局 | `'horizontal' \| 'vertical' \| 'inline'` | `'horizontal'` |
| initialValues | 表单初始值 | `Record<string, any>` | - |
| onFinish | 提交成功回调 | `(values: Record<string, any>) => void` | - |
| onFinishFailed | 提交失败回调（校验不通过） | `(info: { values, errorFields }) => void` | - |
| onValuesChange | 字段值变化回调 | `(changedValues, allValues) => void` | - |
| form | 表单实例 | `FormInstance` | - |
| labelCol | 统一标签列宽 | `{ span?: number; offset?: number }` | - |
| wrapperCol | 统一内容列宽 | `{ span?: number; offset?: number }` | - |
| labelAlign | 标签对齐方式 | `'left' \| 'right'` | `'right'` |
| size | 组件尺寸 | `'small' \| 'middle' \| 'large'` | `'middle'` |
| disabled | 是否禁用 | `boolean` | `false` |
| requiredMark | 必填标记 | `boolean \| 'optional'` | `true` |
| validateTrigger | 统一校验触发时机 | `'onChange' \| 'onBlur' \| Array` | `'onChange'` |

### Form.Item

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| name | 字段名（form store 中的 key） | `string \| (string \| number)[]` | - |
| label | 标签 | `ReactNode` | - |
| rules | 校验规则 | `Rule[]` | `[]` |
| required | 必填标记 | `boolean` | `false` |
| extra | 额外提示信息 | `ReactNode` | - |
| help | 帮助文本 | `ReactNode` | - |
| validateStatus | 手动校验状态 | `'' \| 'success' \| 'error' \| 'warning' \| 'validating'` | - |
| labelCol | 标签列宽 | `{ span?: number; offset?: number }` | - |
| wrapperCol | 内容列宽 | `{ span?: number; offset?: number }` | - |
| labelAlign | 标签对齐 | `'left' \| 'right'` | - |
| hidden | 是否隐藏 | `boolean` | `false` |
| valuePropName | 子组件的值属性名 | `string` | `'value'` |
| getValueFromEvent | 从事件提取值 | `(...args) => any` | - |
| initialValue | 字段初始值 | `any` | - |
| disabled | 是否禁用 | `boolean` | - |
| noStyle | 不渲染 Form.Item 容器 | `boolean` | `false` |
| validateTrigger | 校验触发时机 | `'onChange' \| 'onBlur' \| Array` | - |

### Form.List

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| name | 字段名 | `string \| (string \| number)[]` | - |
| children | 渲染函数 | `(fields, operation) => ReactNode` | - |
| initialValue | 初始值数组 | `any[]` | - |

### Rule 校验规则

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| required | 是否必填 | `boolean` | `false` |
| message | 校验消息 | `string` | - |
| type | 校验类型 | `'string' \| 'number' \| 'email' \| 'url' \| 'boolean'` | `'string'` |
| pattern | 正则校验 | `RegExp` | - |
| min | 最小长度/值 | `number` | - |
| max | 最大长度/值 | `number` | - |
| whitespace | 是否不允许纯空格 | `boolean` | `false` |
| validator | 自定义校验函数 | `(rule, value) => Promise<void>` | - |
| asyncValidator | 异步校验函数 | `(rule, value) => Promise<void>` | - |

### FormInstance

通过 `Form.useForm()` 获取表单实例：

| 方法 | 说明 |
|------|------|
| `getFieldValue(name)` | 获取字段值 |
| `getFieldsValue()` | 获取所有字段值 |
| `setFieldValue(name, value)` | 设置字段值 |
| `setFieldsValue(values)` | 批量设置字段值 |
| `validateFields()` | 校验所有字段 |
| `validateField(name)` | 校验指定字段 |
| `resetFields(names?)` | 重置表单 |
| `clearValidate(names?)` | 清除校验状态 |
| `submit()` | 提交表单 |

## 主题定制

Form 作为标准 React 组件渲染在 ConfigProvider 的 DOM 树内，通过 CSS 变量继承自动获取主题配置。

### 组件级配置

通过 `theme.components.Form` 进行精细化配置：

```tsx
<ConfigProvider
  theme={{
    components: {
      Form: {
        colorPrimary: '#1677ff',
        colorError: '#ff4d4f',
        colorWarning: '#faad14',
        colorSuccess: '#52c41a',
        borderRadius: 6,
        fontSize: 14,
        labelFontSize: 14,
        labelWidth: 100,
        labelColor: 'rgba(0, 0, 0, 0.88)',
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
| colorPrimary | 主色 | `string` | `#1677ff` |
| colorError | 错误色 | `string` | `#ff4d4f` |
| colorWarning | 警告色 | `string` | `#faad14` |
| colorSuccess | 成功色 | `string` | `#52c41a` |
| borderRadius | 圆角大小（像素） | `number` | `6` |
| fontSize | 字体大小（像素） | `number` | `14` |
| labelFontSize | 标签字体大小（像素） | `number` | `14` |
| labelWidth | 标签宽度（像素） | `number` | `auto` |
| labelColor | 标签颜色 | `string` | - |
| textSecondary | 次要文本颜色 | `string` | `rgba(0,0,0,0.65)` |

## 无障碍访问

- Form 使用原生 `<form>` 元素，支持浏览器内置表单行为
- 错误信息通过文本展示，屏幕阅读器可读
- 必填字段显示红色 * 标记

## FAQ

### 如何手动触发校验？

使用 `form.validateFields()` 或 `form.validateField(name)` 手动触发校验。

### Form.Item 下只能有一个表单控件吗？

是的，Form.Item 默认会将 `value` 和 `onChange` 注入到第一个子元素。如果需要多个控件，可以使用 `noStyle` 嵌套多个 Form.Item。

### 如何在表单项之间联动？

通过 `form.setFieldValue` 在 `onValuesChange` 中设置其他字段的值，或使用 `dependencies` 属性触发重新渲染。

### 自定义校验器怎么写？

在 rules 中使用 `validator` 属性，返回 `Promise.resolve()` 表示通过，`Promise.reject(new Error('错误信息'))` 表示失败：

```tsx
<Form.Item name="field" rules={[{
  validator: (rule, value) => {
    if (value === 'admin') return Promise.reject(new Error('不能使用 admin'));
    return Promise.resolve();
  },
}]}>
  <Input />
</Form.Item>
```

## 相关资源

- [Input 输入框](/components/input)
- [Select 选择器](/components/select)
- [Radio 单选框](/components/radio)
- [Checkbox 多选框](/components/checkbox)
