# Form 表单

高性能表单控件，支持数据收集、校验和提交。

## 何时使用

- 需要创建表单并收集用户输入时
- 需要对用户输入进行规则校验时
- 需要动态增减表单项（动态表单）时
- 需要表单联动（如密码确认、条件显示字段）时

## 代码演示

### 基础用法

水平布局的表单，标签在控件左侧。

```tsx
import { Form, Input, Radio, Select, Segmented, Button, Space, Message } from '@soui/ui';

export default () => {
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      layout="horizontal"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      initialValues={{ gender: 'male', view: 'list' }}
      onFinish={(values) => {
        Message.success('提交成功！');
        console.log(values);
      }}
    >
      <Form.Item name="username" label="用户名" rules={[{ required: true, message: '请输入用户名' }]}>
        <Input placeholder="请输入用户名" />
      </Form.Item>
      <Form.Item name="password" label="密码" rules={[{ required: true, message: '请输入密码' }, { min: 6, message: '密码至少6个字符' }]}>
        <Input.Password placeholder="请输入密码" />
      </Form.Item>
      <Form.Item name="gender" label="性别">
        <Radio.Group options={[{ label: '男', value: 'male' }, { label: '女', value: 'female' }]} />
      </Form.Item>
      <Form.Item name="role" label="角色">
        <Select placeholder="请选择角色" options={[{ label: '管理员', value: 'admin' }, { label: '编辑者', value: 'editor' }]} />
      </Form.Item>
      <Form.Item name="view" label="视图模式">
        <Segmented options={[{ label: '列表', value: 'list' }, { label: '网格', value: 'grid' }, { label: '画廊', value: 'gallery' }]} />
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

标签在控件上方，适合移动端或字段较多的表单。

```tsx
import { Form, Input, Button, Space, Message } from '@soui/ui';

export default () => {
  const [form] = Form.useForm();

  return (
    <Form form={form} layout="vertical" onFinish={(v) => Message.success('提交成功！')}>
      <Form.Item name="name" label="姓名" rules={[{ required: true, message: '请输入姓名' }]}>
        <Input placeholder="请输入姓名" />
      </Form.Item>
      <Form.Item name="email" label="邮箱" rules={[{ required: true, message: '请输入邮箱' }, { type: 'email', message: '请输入有效的邮箱地址' }]}>
        <Input placeholder="example@email.com" />
      </Form.Item>
      <Form.Item name="address" label="地址">
        <Input.TextArea placeholder="请输入地址" rows={3} />
      </Form.Item>
      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit">提交</Button>
          <Button onClick={() => form.resetFields()}>重置</Button>
        </Space>
      </Form.Item>
    </Form>
  );
};
```

### 行内布局

所有字段在一行显示，适合登录、搜索等简短表单。

```tsx
import { Form, Input, Button, Message } from '@soui/ui';

export default () => (
  <Form layout="inline" onFinish={(v) => Message.success('登录成功！')}>
    <Form.Item name="username" rules={[{ required: true, message: '请输入用户名' }]}>
      <Input placeholder="用户名" style={{ width: 160 }} />
    </Form.Item>
    <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
      <Input.Password placeholder="密码" style={{ width: 160 }} />
    </Form.Item>
    <Form.Item>
      <Button type="primary" htmlType="submit">登录</Button>
    </Form.Item>
  </Form>
);
```

### 校验规则

支持多种校验规则：必填、长度限制、正则表达式、邮箱、手机号、URL、自定义同步/异步校验、跨字段校验等。

```tsx
import { Form, Input, Button, Space, Message } from '@soui/ui';

export default () => {
  const [form] = Form.useForm();

  return (
    <Form layout="vertical" form={form}
      onFinish={(v) => Message.success('校验通过！')}
      onFinishFailed={() => Message.error('请修正表单中的错误')}>
      <Form.Item name="username" label="用户名"
        rules={[
          { required: true, message: '用户名不能为空' },
          { min: 3, max: 20, message: '用户名 3-20 个字符' },
          { pattern: /^[a-zA-Z0-9_]+$/, message: '只能包含字母、数字和下划线' },
        ]}>
        <Input placeholder="3-20位字母、数字或下划线" />
      </Form.Item>
      <Form.Item name="email" label="邮箱"
        rules={[{ required: true, message: '邮箱不能为空' }, { type: 'email', message: '请输入有效的邮箱' }]}>
        <Input placeholder="example@email.com" />
      </Form.Item>
      <Form.Item name="phone" label="手机号"
        rules={[{ required: true, message: '手机号不能为空' }, { type: 'phone', message: '请输入有效的手机号' }]}>
        <Input placeholder="请输入手机号" />
      </Form.Item>
      <Form.Item name="password" label="密码"
        rules={[
          { required: true, message: '密码不能为空' },
          { min: 6, message: '密码至少6个字符' },
          {
            validator: (_rule, value) => {
              if (value && !/(?=.*[a-zA-Z])(?=.*\d)/.test(value)) {
                return Promise.reject(new Error('密码须包含字母和数字'));
              }
              return Promise.resolve();
            },
          },
        ]}>
        <Input.Password placeholder="至少6位，包含字母和数字" />
      </Form.Item>
      <Form.Item name="confirm" label="确认密码" dependencies={['password']}
        rules={[
          { required: true, message: '请确认密码' },
          {
            validator: (_rule, value) => {
              if (value && value !== form.getFieldValue('password')) {
                return Promise.reject(new Error('两次输入的密码不一致'));
              }
              return Promise.resolve();
            },
          },
        ]}>
        <Input.Password placeholder="再次输入密码" />
      </Form.Item>
      <Form.Item name="inviteCode" label="邀请码"
        rules={[
          { required: true, message: '请输入邀请码' },
          {
            asyncValidator: (_rule, value) => {
              return new Promise<void>((resolve, reject) => {
                setTimeout(() => {
                  const validCodes = ['SOUI2024', 'WELCOME', 'DEMO888'];
                  if (validCodes.includes(value?.toUpperCase())) {
                    resolve();
                  } else {
                    reject(new Error('邀请码无效或已过期'));
                  }
                }, 600);
              });
            },
          },
        ]}>
        <Input placeholder="输入邀请码（试试 SOUI2024）" />
      </Form.Item>
      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit">提交</Button>
          <Button onClick={() => form.resetFields()}>重置</Button>
        </Space>
      </Form.Item>
    </Form>
  );
};
```

### 动态字段

使用 Form.List 动态增删表单项，适用于联系人、工作经历等场景。

```tsx
import { Form, Input, Button, Space, Message } from '@soui/ui';

export default () => {
  const [form] = Form.useForm();

  return (
    <Form form={form} layout="vertical" initialValues={{ contacts: [{ name: '', email: '' }] }}
      onFinish={(v) => Message.success('提交成功！')}>
      <Form.Item name="company" label="公司名称" rules={[{ required: true, message: '请输入公司名称' }]}>
        <Input placeholder="请输入公司名称" />
      </Form.Item>
      <Form.List name="contacts">
        {(fields, { add, remove }) => (
          <>
            <div style={{ marginBottom: 8, fontWeight: 500 }}>联系人列表</div>
            {fields.map((field) => (
              <div key={field.key} style={{ display: 'flex', gap: 12, marginBottom: 12, alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <Form.Item name={[field.name, 'name']} rules={[{ required: true, message: '请输入姓名' }]} noStyle>
                    <Input placeholder="联系人姓名" style={{ marginBottom: 8 }} />
                  </Form.Item>
                  <Form.Item name={[field.name, 'email']} rules={[{ required: true, message: '请输入邮箱' }]} noStyle>
                    <Input placeholder="联系人邮箱" />
                  </Form.Item>
                </div>
                <Button type="default" danger onClick={() => remove(field.name)} disabled={fields.length <= 1}>删除</Button>
              </div>
            ))}
            <Button type="default" onClick={() => add({ name: '', email: '' })} style={{ width: '100%', borderStyle: 'dashed' }}>
              + 添加联系人
            </Button>
          </>
        )}
      </Form.List>
      <Form.Item style={{ marginTop: 24 }}>
        <Space>
          <Button type="primary" htmlType="submit">提交</Button>
          <Button onClick={() => form.resetFields()}>重置</Button>
        </Space>
      </Form.Item>
    </Form>
  );
};
```

### 条件字段显示

通过 `shouldUpdate` + `children` 渲染函数，根据其它字段的值动态渲染/隐藏表单项。渲染函数接收当前 Form 的 form 实例作为参数，通过它读取字段值。

```tsx
import { Form, Input, Select, Button, Message } from '@soui/ui';

export default () => {
  const [form] = Form.useForm();

  return (
    <Form form={form} layout="vertical" onFinish={(v) => Message.success('注册成功')}>
      <Form.Item name="accountType" label="注册类型"
        rules={[{ required: true, message: '请选择注册类型' }]}>
        <Select placeholder="请选择" options={[
          { label: '个人', value: 'personal' },
          { label: '企业', value: 'company' },
        ]} />
      </Form.Item>

      <Form.Item noStyle shouldUpdate={(prev, cur) => prev.accountType !== cur.accountType}>
        {(f) => {
          const accountType = f.getFieldValue('accountType');
          if (accountType === 'personal') {
            return (
              <Form.Item name="idCard" label="身份证号"
                rules={[{ required: true, message: '请输入身份证号' }]}>
                <Input placeholder="请输入身份证号" />
              </Form.Item>
            );
          }
          if (accountType === 'company') {
            return (
              <>
                <Form.Item name="companyName" label="企业名称"
                  rules={[{ required: true, message: '请输入企业名称' }]}>
                  <Input placeholder="请输入企业名称" />
                </Form.Item>
                <Form.Item name="taxId" label="税号"
                  rules={[{ required: true, message: '请输入税号' }]}>
                  <Input placeholder="请输入税号" />
                </Form.Item>
              </>
            );
          }
          return null;
        }}
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">注册</Button>
      </Form.Item>
    </Form>
  );
};
```

### 自定义控件

Form.Item 自动注入 `value` / `onChange` 给子控件，兼容所有 SoUi 表单组件。对于值属性名不是 `value` 的组件，使用 `valuePropName` 指定：

```tsx
import { Form, Input, InputNumber, Select, Radio, Segmented, Checkbox, Switch,
  Slider, Rate, DatePicker, TimePicker, Cascader, ColorPicker,
  TreeSelect, Transfer, Upload, Button, Message } from '@soui/ui';

export default () => {
  const [form] = Form.useForm();

  return (
    <Form form={form} layout="vertical"
      initialValues={{
        gender: 'male', view: 'list', hobbies: ['reading'], enableNotify: true,
        satisfaction: 3, volume: 50, themeColor: '#1677ff',
        assignedItems: ['1', '3'], avatar: [],
      }}
      onFinish={(v) => { Message.success('提交成功！'); console.log(v); }}>
      {/* 标准 value/onChange 控件 */}
      <Form.Item name="nickname" label="昵称" rules={[{ required: true, message: '请输入昵称' }]}>
        <Input placeholder="请输入昵称" />
      </Form.Item>
      <Form.Item name="age" label="年龄">
        <InputNumber placeholder="请输入年龄" style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item name="gender" label="性别">
        <Radio.Group options={[{ label: '男', value: 'male' }, { label: '女', value: 'female' }]} />
      </Form.Item>
      <Form.Item name="view" label="视图模式">
        <Segmented options={[{ label: '列表', value: 'list' }, { label: '网格', value: 'grid' }, { label: '画廊', value: 'gallery' }]} />
      </Form.Item>
      <Form.Item name="hobbies" label="兴趣爱好">
        <Checkbox.Group options={[{ label: '阅读', value: 'reading' }, { label: '运动', value: 'sports' }]} />
      </Form.Item>
      <Form.Item name="satisfaction" label="满意度"><Rate /></Form.Item>
      <Form.Item name="volume" label="音量"><Slider /></Form.Item>
      <Form.Item name="birthday" label="出生日期">
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item name="themeColor" label="主题颜色"><ColorPicker /></Form.Item>
      <Form.Item name="department" label="所属部门">
        <TreeSelect treeData={[{ label: '技术部', value: 'tech', children: [{ label: '前端', value: 'fe' }] }]}
          placeholder="请选择" allowClear style={{ width: '100%' }} />
      </Form.Item>

      {/* Switch 使用 valuePropName="checked" */}
      <Form.Item name="enableNotify" label="开启通知" valuePropName="checked">
        <Switch />
      </Form.Item>

      {/* Transfer 使用 valuePropName="targetKeys" */}
      <Form.Item name="assignedItems" label="穿梭框" valuePropName="targetKeys">
        <Transfer dataSource={[...]} titles={['待选', '已选']} render={(item) => item.title} />
      </Form.Item>

      {/* Upload 使用 valuePropName="fileList" */}
      <Form.Item name="avatar" label="上传附件" valuePropName="fileList">
        <Upload action="#"><Button>点击上传</Button></Upload>
      </Form.Item>

      <Form.Item>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button type="primary" htmlType="submit">提交</Button>
          <Button onClick={() => form.resetFields()}>重置</Button>
        </div>
      </Form.Item>
    </Form>
  );
};
```

## API

### Form

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| form | 表单实例，通过 `useForm` 创建 | `FormInstance` | - |
| layout | 表单布局 | `'horizontal' \| 'vertical' \| 'inline'` | `'horizontal'` |
| size | 表单尺寸 | `'large' \| 'middle' \| 'small'` | `'middle'` |
| labelCol | 标签列宽（horizontal 布局） | `{ span?: number; offset?: number }` | - |
| wrapperCol | 控件列宽（horizontal 布局） | `{ span?: number; offset?: number }` | - |
| labelAlign | 标签对齐方式 | `'left' \| 'right'` | `'left'` |
| initialValues | 表单初始值 | `Record<string, any>` | - |
| disabled | 禁用所有表单项 | `boolean` | `false` |
| requiredMark | 必填标记模式 | `boolean \| 'optional'` | `true` |
| validateTrigger | 校验触发时机 | `string \| string[]` | `'onChange'` |
| onFinish | 提交成功回调 | `(values: any) => void` | - |
| onFinishFailed | 提交失败回调 | `(info: { errorFields: any[] }) => void` | - |
| onValuesChange | 字段值变化回调 | `(changed: any, all: any) => void` | - |

### Form.Item

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| name | 字段名，支持嵌套路径 | `string \| number \| (string \| number)[]` | - |
| label | 标签文本 | `ReactNode` | - |
| required | 是否必填（同时自动注入 `{ required: true }` 校验规则） | `boolean` | - |
| rules | 校验规则 | `RuleConfig[]` | - |
| dependencies | 依赖字段（变化时触发本字段重新校验） | `(string \| number \| (string \| number)[])[]` | - |
| shouldUpdate | 字段值变化时是否重新渲染（常配合 `children` 为函数使用） | `boolean \| ((prev, cur) => boolean)` | - |
| initialValue | 字段初始值 | `any` | - |
| extra | 额外提示信息 | `ReactNode` | - |
| validateStatus | 校验状态 | `'error' \| 'warning' \| 'success' \| 'validating'` | - |
| labelCol | 标签列宽（覆盖 Form） | `{ span?: number; offset?: number }` | - |
| wrapperCol | 控件列宽（覆盖 Form） | `{ span?: number; offset?: number }` | - |
| labelAlign | 标签对齐方式 | `'left' \| 'right'` | - |
| layout | 布局覆盖 | `'horizontal' \| 'vertical'` | - |
| noStyle | 无样式模式（不渲染标签和包裹，但仍收集值和显示校验错误） | `boolean` | `false` |
| valuePropName | 子元素值属性名（Switch 用 `checked`，Transfer 用 `targetKeys`，Upload 用 `fileList`） | `string` | `'value'` |
| hasFeedback | 显示反馈图标 | `boolean` | `false` |
| children | 子元素（可以是 ReactNode 或渲染函数） | `ReactNode \| ((form: FormInstance) => ReactNode)` | - |

### Form.List

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| name | 字段名 | `string \| number \| (string \| number)[]` | - |

Form.List 渲染函数参数：

```tsx
children: (fields: FormListFieldData[], operations: FormListOperations) => ReactNode
```

`FormListFieldData`:

| 字段 | 说明 | 类型 |
|------|------|------|
| name | 字段索引 | `number` |
| key | 唯一 key | `number` |
| fieldKey | 字段 key（与 name 相同） | `number` |

`FormListOperations`:

| 方法 | 说明 |
|------|------|
| add(defaultValue?) | 添加一个字段 |
| remove(index) | 删除指定索引的字段 |
| move(from, to) | 移动字段位置 |

### FormInstance（useForm 返回）

| 方法 | 说明 | 返回类型 |
|------|------|----------|
| getFieldValue | 获取单个字段值 | `any` |
| getFieldsValue | 获取所有或指定字段值 | `any` |
| setFieldValue | 设置单个字段值 | `void` |
| setFieldsValue | 批量设置字段值 | `void` |
| resetFields | 重置所有或指定字段 | `void` |
| validateFields | 校验所有或指定字段 | `Promise<any>` |
| submit | 提交表单 | `Promise<any>` |
| scrollToField | 滚动到指定字段 | `void` |
| clearValidate | 清除校验状态 | `void` |

### RuleConfig（校验规则）

| 参数 | 说明 | 类型 |
|------|------|------|
| required | 是否必填 | `boolean` |
| message | 错误提示文本 | `string` |
| type | 内置校验类型 | `'email' \| 'url' \| 'number' \| 'phone'` |
| min | 最小值/最小长度 | `number` |
| max | 最大值/最大长度 | `number` |
| pattern | 正则表达式 | `RegExp` |
| whitespace | 不允许纯空格 | `boolean` |
| validator | 自定义同步校验器（Ant Design 风格：`(rule, value) => Promise<void> \| void`） | `(rule: RuleConfig, value: any) => Promise<void> \| void` |
| asyncValidator | 自定义异步校验器（Ant Design 风格：`(rule, value) => Promise<void>`） | `(rule: RuleConfig, value: any) => Promise<void>` |
| validateTrigger | 校验触发时机 | `string \| string[]` |

## 主题定制

Form 作为标准 React 组件渲染在 ConfigProvider 的 DOM 树内，通过 CSS 变量继承自动获取主题配置。

### 组件级配置

通过 `theme.components.Form` 针对组件进行精细化配置：

```tsx
<ConfigProvider
  theme={{
    components: {
      Form: {
        colorPrimary: '#52c41a',
        colorError: '#ff4d4f',
        labelFontSize: 13,
        borderRadius: 8,
      },
    },
  }}
>
  <Form layout="vertical">
    {/* ... */}
  </Form>
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
| labelWidth | 标签宽度（像素） | `number` | - |
| labelColor | 标签颜色 | `string` | - |
| textSecondary | 次要文本颜色 | `string` | `rgba(0,0,0,0.65)` |

### 自定义 CSS 变量

```tsx
<Form style={{ '--soui-form-border-radius': '10px' }}>
  {/* ... */}
</Form>
```

## FAQ

### Form.Item 的 name 支持哪些格式？

支持三种格式：
- 简单字符串：`"username"` → `{ username: value }`
- 嵌套路径：`"user.name"` → `{ user: { name: value } }`
- 数组索引：`"users.0.name"` → `{ users: [{ name: value }] }`

### 如何实现密码确认联动？

使用 `dependencies` 属性声明依赖，然后在校验器中通过 `form.getFieldValue` 获取被依赖字段的值：

```tsx
<Form.Item name="confirmPassword" dependencies={['password']}
  rules={[{ required: true, message: '请确认密码' },
    {
      validator: (_rule, value) => {
        const password = form.getFieldValue('password');
        if (!value || password === value) {
          return Promise.resolve();
        }
        return Promise.reject(new Error('两次密码不一致'));
      },
    },
  ]}>
  <Input.Password placeholder="请再次输入密码" />
</Form.Item>
```

### 如何动态显示/隐藏字段？

使用 `noStyle` 和 `shouldUpdate`：

```tsx
<Form.Item noStyle shouldUpdate={(prev, cur) => prev.type !== cur.type}>
  {({ getFieldValue }) =>
    getFieldValue('type') === 'company' ? (
      <Form.Item name="companyName" label="公司名称" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
    ) : null
  }
</Form.Item>
```

### shouldUpdate 和 dependencies 有什么区别？

两者都用于响应其他字段的变化，但用途不同：

| 特性 | `shouldUpdate` | `dependencies` |
|------|----------------|----------------|
| 用途 | 控制当前 FormItem 是否重新渲染 | 依赖字段变化时触发当前字段重新校验 |
| 适用场景 | 渲染函数（`children` 为函数）中动态显示/隐藏字段、切换 UI | 跨字段联动校验（如确认密码依赖密码） |
| 子元素形式 | 必须是函数 | 必须是 ReactNode（受控表单控件） |
| 类型 | `boolean \| ((prev, cur) => boolean)` | `(string \| number \| (string \| number)[])[]` |

推荐用法：

- **条件渲染**：用 `shouldUpdate={(prev, cur) => prev.x !== cur.x}` + `children` 为函数，避免无关字段变化导致的无效渲染
- **联动校验**：用 `dependencies={['password']}`，依赖字段变化时自动触发当前字段重新校验，无需手写 shouldUpdate

### 如何集成 Transfer、Upload 等非标准控件？

部分组件的值属性名不是 `value`，需要通过 `valuePropName` 指定。Form 会自动识别 `valuePropName` 并在 `onChange` 回调中提取对应的值：

```tsx
{/* Switch — checked 属性 */}
<Form.Item name="enableNotify" label="开启通知" valuePropName="checked">
  <Switch />
</Form.Item>

{/* Transfer — targetKeys 属性 */}
<Form.Item name="selectedKeys" label="穿梭框" valuePropName="targetKeys">
  <Transfer dataSource={data} render={(item) => item.title} />
</Form.Item>

{/* Upload — fileList 属性 */}
<Form.Item name="files" label="附件" valuePropName="fileList">
  <Upload action="/api/upload">
    <Button>点击上传</Button>
  </Upload>
</Form.Item>
```

> **注意：** `required` 属性不仅控制必填星号的显示，还会自动注入 `{ required: true }` 校验规则，无需在 `rules` 中重复声明。
