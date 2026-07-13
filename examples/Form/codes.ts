export const basicCode = `const [form] = Form.useForm();

const onFinish = (values) => {
  Message.success('提交成功！');
  console.log(values);
};

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
  <Form.Item name="password" label="密码" rules={[{ required: true, message: '请输入密码' }, { min: 6, message: '密码至少6个字符' }]}>
    <Input.Password placeholder="请输入密码" />
  </Form.Item>
  <Form.Item name="gender" label="性别">
    <Radio.Group options={[{ label: '男', value: 'male' }, { label: '女', value: 'female' }]} />
  </Form.Item>
  <Form.Item name="role" label="角色">
    <Select placeholder="请选择角色" options={[{ label: '管理员', value: 'admin' }, { label: '编辑者', value: 'editor' }, { label: '普通用户', value: 'user' }]} />
  </Form.Item>
  <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
    <Space>
      <Button type="primary" htmlType="submit">提交</Button>
      <Button onClick={() => form.resetFields()}>重置</Button>
    </Space>
  </Form.Item>
</Form>`;

export const verticalCode = `const [form] = Form.useForm();

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
</Form>`;

export const inlineCode = `<Form layout="inline" onFinish={(v) => Message.success('登录成功！')}>
  <Form.Item name="username" rules={[{ required: true, message: '请输入用户名' }]}>
    <Input placeholder="用户名" style={{ width: 160 }} />
  </Form.Item>
  <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
    <Input.Password placeholder="密码" style={{ width: 160 }} />
  </Form.Item>
  <Form.Item>
    <Button type="primary" htmlType="submit">登录</Button>
  </Form.Item>
</Form>`;

export const validationCode = `<Form layout="vertical" onFinish={(v) => Message.success('校验通过！')} onFinishFailed={() => Message.error('请修正表单中的错误')}>
  <Form.Item name="username" label="用户名"
    rules={[{ required: true, message: '用户名不能为空' }, { min: 3, max: 20, message: '3-20个字符' }, { pattern: /^[a-zA-Z0-9_]+$/, message: '只能包含字母、数字和下划线' }]}>
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
  <Form.Item>
    <Space>
      <Button type="primary" htmlType="submit">提交</Button>
      <Button onClick={() => form.resetFields()}>重置</Button>
    </Space>
  </Form.Item>
</Form>`;

export const dynamicFieldsCode = `const [form] = Form.useForm();

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
</Form>`;

export const themeCode = `<ConfigProvider theme={{ primaryColor: '#52c41a', components: { Form: { colorPrimary: '#52c41a', labelFontSize: 13, borderRadius: 8 } } }}>
  <Form layout="vertical" onFinish={(v) => Message.success('提交成功！')}>
    <Form.Item name="name" label="姓名" rules={[{ required: true, message: '请输入姓名' }]}>
      <Input placeholder="请输入姓名" />
    </Form.Item>
    <Form.Item name="email" label="邮箱" rules={[{ required: true, message: '请输入邮箱' }]}>
      <Input placeholder="请输入邮箱" />
    </Form.Item>
    <Form.Item>
      <Button type="primary" htmlType="submit" style={{ background: '#52c41a', borderColor: '#52c41a' }}>提交</Button>
    </Form.Item>
  </Form>
</ConfigProvider>`;
