---
title: Mentions 提及
---

# Mentions 提及

用于在文本中 @提及用户或其他实体，支持多前缀触发。

## 何时使用

- 评论区 @用户
- 多人协作场景
- 需要提及话题、标签等

## 代码示例

### 基础用法

```tsx
import { Mentions } from '@soui/ui';

export default () => {
  const options = [
    { value: '张三', label: '张三' },
    { value: '李四', label: '李四' },
    { value: '王五', label: '王五' },
    { value: '赵六', label: '赵六' },
  ];

  return (
    <Mentions
      options={options}
      placeholder="输入 @ 提及用户"
      rows={3}
      style={{ width: '100%' }}
    />
  );
};
```

### 多前缀

```tsx
import { Mentions } from '@soui/ui';

export default () => {
  const users = [
    { value: 'alice', label: 'Alice' },
    { value: 'bob', label: 'Bob' },
    { value: 'charlie', label: 'Charlie' },
  ];

  return (
    <Mentions
      options={users}
      prefix={['@', '#']}
      placeholder="输入 @ 提及用户，# 提及话题"
      style={{ width: '100%' }}
    />
  );
};
```

### Form 表单集成

```tsx
import { Mentions, Form, Button } from '@soui/ui';

export default () => {
  const [form] = Form.useForm();
  const options = [
    { value: '张三', label: '张三' },
    { value: '李四', label: '李四' },
    { value: '王五', label: '王五' },
  ];

  const onFinish = (values) => {
    console.log('表单值:', values);
  };

  return (
    <Form form={form} onFinish={onFinish} style={{ maxWidth: 500 }}>
      <Form.Item label="评论" name="comment" rules={[{ required: true, message: '请输入评论内容' }]}>
        <Mentions options={options} placeholder="输入 @ 提及用户" rows={3} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" onClick={() => form.submit()}>提交</Button>
      </Form.Item>
    </Form>
  );
};
```

## API

### Mentions

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 当前值 | string | - |
| defaultValue | 默认值 | string | `''` |
| options | 选项数据 | `(MentionsOption \| string)[]` | `[]` |
| onChange | 值变化回调 | `(value: string) => void` | - |
| onSelect | 选中提及回调 | `(option: MentionsOption, prefix: string) => void` | - |
| onSearch | 搜索回调 | `(text: string, prefix: string) => void` | - |
| onBlur | 失焦回调 | `(e: FocusEvent) => void` | - |
| prefix | 触发前缀 | string \| string[] | `'@'` |
| split | 分隔符 | string | `' '` |
| placeholder | 占位符 | string | - |
| disabled | 是否禁用 | boolean | `false` |
| filterOption | 是否本地过滤 | boolean \| `((input, option) => boolean)` | `true` |
| notFoundContent | 空状态内容 | ReactNode | `'暂无数据'` |
| placement | 下拉位置 | `'top' \| 'bottom'` | `'bottom'` |
| size | 尺寸 | `'small' \| 'middle' \| 'large'` | `'middle'` |
| status | 状态 | `'error' \| 'warning'` | - |
| rows | 行数 | number | `3` |

### MentionsOption

| 属性 | 说明 | 类型 |
| --- | --- | --- |
| value | 选项值 | string |
| label | 选项标签 | ReactNode |
| disabled | 是否禁用 | boolean |

## 主题定制

通过 `ConfigProvider` 的 `theme.components.Mentions` 配置：

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| colorPrimary | 主色 | string | `'#1677ff'` |
| colorBorder | 边框颜色 | string | `'#d9d9d9'` |
| borderRadius | 圆角（像素） | number | `6` |
| fontSize | 字体大小（像素） | number | `14` |
| colorBg | 背景色 | string | `'#fff'` |
| colorText | 文本颜色 | string | `'rgba(0, 0, 0, 0.88)'` |
