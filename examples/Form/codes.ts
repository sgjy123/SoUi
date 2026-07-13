export const basicCode = `const [form] = Form.useForm();

const onFinish = (values) => {
  Message.success('提交成功！');
  console.log(values);
};

<div style={{ maxWidth: 520 }}>
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
    <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
      <Space>
        <Button type="primary" htmlType="submit">提交</Button>
        <Button onClick={() => form.resetFields()}>重置</Button>
      </Space>
    </Form.Item>
  </Form>
</div>`;

export const verticalCode = `const [form] = Form.useForm();

<div style={{ maxWidth: 400 }}>
  <Form form={form} layout="vertical" onFinish={(v) => Message.success('提交成功！')}>
    <Form.Item name="name" label="姓名" rules={[{ required: true, message: '请输入姓名' }]}>
      <Input placeholder="请输入姓名" />
    </Form.Item>
    <Form.Item name="email" label="邮箱" rules={[{ required: true, message: '请输入邮箱' }, { type: 'email', message: '请输入有效的邮箱地址' }]}>
      <Input placeholder="请输入邮箱" />
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
</div>`;

export const inlineCode = `<Form layout="inline" onFinish={(v) => Message.success('登录成功！')}>
  <Form.Item name="username" rules={[{ required: true, message: '请输入用户名' }]}>
    <Input placeholder="用户名" />
  </Form.Item>
  <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
    <Input.Password placeholder="密码" />
  </Form.Item>
  <Form.Item>
    <Button type="primary" htmlType="submit">登录</Button>
  </Form.Item>
</Form>`;

export const validationCode = `const [form] = Form.useForm();

<div style={{ maxWidth: 520 }}>
  <Form form={form} layout="vertical" onFinish={(v) => Message.success('校验通过！')} onFinishFailed={() => Message.error('校验失败')}>
    <Form.Item name="username" label="用户名" rules={[{ required: true, message: '用户名不能为空' }, { min: 3, max: 20, message: '3-20个字符' }, { pattern: /^[a-zA-Z0-9_]+$/, message: '只能包含字母、数字和下划线' }]}>
      <Input placeholder="3-20位字母、数字或下划线" />
    </Form.Item>
    <Form.Item name="email" label="邮箱" rules={[{ required: true, message: '邮箱不能为空' }, { type: 'email', message: '请输入有效的邮箱' }]}>
      <Input placeholder="example@email.com" />
    </Form.Item>
    <Form.Item name="phone" label="手机号" rules={[{ required: true, message: '手机号不能为空' }, { pattern: /^1[3-9]\\d{9}$/, message: '请输入有效的手机号' }]}>
      <Input placeholder="请输入手机号" />
    </Form.Item>
    <Form.Item>
      <Space>
        <Button type="primary" htmlType="submit">提交</Button>
        <Button onClick={() => form.resetFields()}>重置</Button>
      </Space>
    </Form.Item>
  </Form>
</div>`;

export const dynamicFieldsCode = `const [form] = Form.useForm();

<div style={{ maxWidth: 520 }}>
  <Form form={form} layout="vertical" initialValues={{ contacts: [{ name: '', phone: '' }] }} onFinish={(v) => Message.success('提交成功！')}>
    <Form.Item name="company" label="公司名称" rules={[{ required: true, message: '请输入公司名称' }]}>
      <Input placeholder="请输入公司名称" />
    </Form.Item>
    <Form.List name="contacts">
      {(fields, { add, remove }) => (
        <>
          <div style={{ marginBottom: 8, fontWeight: 500 }}>联系人列表</div>
          {fields.map((field) => (
            <div key={field.key} style={{ display: 'flex', gap: 8, marginBottom: 12, alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <Form.Item name={[field.name, 'name']} rules={[{ required: true, message: '请输入姓名' }]} noStyle>
                  <Input placeholder="联系人姓名" />
                </Form.Item>
              </div>
              <div style={{ flex: 1 }}>
                <Form.Item name={[field.name, 'phone']} rules={[{ required: true, message: '请输入手机号' }]} noStyle>
                  <Input placeholder="手机号" />
                </Form.Item>
              </div>
              <Button type="default" onClick={() => remove(field.name)} disabled={fields.length <= 1}>删除</Button>
            </div>
          ))}
          <Button type="default" onClick={() => add({ name: '', phone: '' })} style={{ width: '100%', borderStyle: 'dashed' }}>
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
</div>`;

export const themeCode = `<ConfigProvider theme={{ primaryColor: '#52c41a', components: { Form: { colorPrimary: '#52c41a', colorError: '#fa541c', labelFontSize: 13 } } }}>
  <div style={{ maxWidth: 400 }}>
    <Form layout="vertical" onFinish={(v) => Message.success('提交成功！')}>
      <Form.Item name="name" label="姓名" rules={[{ required: true, message: '请输入姓名' }]}>
        <Input placeholder="请输入姓名" />
      </Form.Item>
      <Form.Item name="email" label="邮箱" rules={[{ required: true, message: '请输入邮箱' }, { type: 'email', message: '格式不正确' }]}>
        <Input placeholder="请输入邮箱" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ background: '#52c41a', borderColor: '#52c41a' }}>提交</Button>
      </Form.Item>
    </Form>
  </div>
</ConfigProvider>`;

export const formInstanceDemoCode = `const [form] = Form.useForm();

const handleSetValues = () => {
  form.setFieldsValue({ username: 'admin', email: 'admin@example.com', phone: '13800138000' });
  Message.info('已填充表单值');
};
const handleGetValues = () => {
  const values = form.getFieldsValue();
  Message.info('当前值: ' + JSON.stringify(values, null, 0));
};
const handleGetValue = () => {
  const username = form.getFieldValue('username');
  Message.info(\`username = \${username || '(空)'}\`);
};
const handleValidate = async () => {
  try {
    const values = await form.validateFields();
    Message.success('校验通过: ' + JSON.stringify(values, null, 0));
  } catch (err) {
    Message.error(\`校验失败，\${err.errorFields?.length || 0} 个字段有错误\`);
  }
};
const handleClearValidate = () => { form.clearValidate(); Message.info('已清除所有校验状态'); };
const handleReset = () => { form.resetFields(); Message.info('表单已重置'); };
const handleResetSingle = () => { form.resetFields(['email']); Message.info('已重置 email 字段'); };

<div style={{ maxWidth: 520 }}>
  <Form form={form} layout="vertical" initialValues={{ username: '', email: '', phone: '' }}
    onFinish={(v) => Message.success('提交成功！')} onFinishFailed={(info) => Message.error(\`提交失败，\${info.errorFields.length} 个错误\`)}>
    <Form.Item name="username" label="用户名" rules={[{ required: true, message: '用户名不能为空' }]}>
      <Input placeholder="请输入用户名" />
    </Form.Item>
    <Form.Item name="email" label="邮箱" rules={[{ required: true, message: '邮箱不能为空' }, { type: 'email', message: '邮箱格式不正确' }]}>
      <Input placeholder="请输入邮箱" />
    </Form.Item>
    <Form.Item name="phone" label="手机号">
      <Input placeholder="请输入手机号" />
    </Form.Item>
  </Form>
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 16, padding: 16, background: '#f5f5f5', borderRadius: 6 }}>
    <Button onClick={handleSetValues}>setFieldsValue</Button>
    <Button onClick={handleGetValues}>getFieldsValue</Button>
    <Button onClick={handleGetValue}>getFieldValue</Button>
    <Button onClick={handleValidate}>validateFields</Button>
    <Button onClick={handleClearValidate}>clearValidate</Button>
    <Button onClick={handleReset}>resetFields</Button>
    <Button onClick={handleResetSingle}>resetFields(['email'])</Button>
    <Button type="primary" onClick={() => form.submit()}>submit</Button>
  </div>
</div>`;

export const sizeCode = `const [size, setSize] = React.useState('middle');

<div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
    <span style={{ fontWeight: 500 }}>表单尺寸：</span>
    {['small', 'middle', 'large'].map((s) => (
      <Button key={s} type={size === s ? 'primary' : 'default'} onClick={() => setSize(s)}>{s}</Button>
    ))}
  </div>
  <div style={{ maxWidth: 480 }}>
    <Form layout="vertical" size={size} onFinish={(v) => Message.success(\`[\${size}] 提交成功\`)}>
      <Form.Item name="name" label="姓名" rules={[{ required: true, message: '请输入姓名' }]}>
        <Input placeholder="请输入姓名" />
      </Form.Item>
      <Form.Item name="role" label="角色">
        <Select placeholder="请选择角色" options={[{ label: '管理员', value: 'admin' }, { label: '编辑者', value: 'editor' }]} />
      </Form.Item>
      <Form.Item name="desc" label="描述">
        <Input.TextArea placeholder="请输入描述" rows={2} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">提交 ({size})</Button>
      </Form.Item>
    </Form>
  </div>
</div>`;

export const disabledCode = `const [disabled, setDisabled] = React.useState(true);

<div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
    <span style={{ fontWeight: 500 }}>表单禁用：</span>
    <Switch checked={disabled} onChange={setDisabled} />
    <span style={{ color: '#999', fontSize: 12 }}>{disabled ? '已禁用' : '已启用'}</span>
  </div>
  <div style={{ maxWidth: 520 }}>
    <Form layout="horizontal" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} disabled={disabled}
      initialValues={{ username: 'readonly_user', email: 'user@example.com', role: 'admin', age: 25 }}
      onFinish={(v) => Message.success('提交成功')}>
      <Form.Item name="username" label="用户名" rules={[{ required: true }]}>
        <Input placeholder="用户名" />
      </Form.Item>
      <Form.Item name="email" label="邮箱"><Input placeholder="邮箱" /></Form.Item>
      <Form.Item name="role" label="角色">
        <Select options={[{ label: '管理员', value: 'admin' }, { label: '编辑者', value: 'editor' }, { label: '普通用户', value: 'user' }]} />
      </Form.Item>
      <Form.Item name="age" label="年龄"><InputNumber placeholder="年龄" style={{ width: '100%' }} /></Form.Item>
      <Form.Item name="bio" label="简介"><Input.TextArea placeholder="个人简介" rows={2} /></Form.Item>
      <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button type="primary" htmlType="submit" disabled={disabled}>提交</Button>
          <Button onClick={() => setDisabled(!disabled)}>{disabled ? '启用表单' : '禁用表单'}</Button>
        </div>
      </Form.Item>
    </Form>
  </div>
</div>`;

export const requiredMarkCode = `const [requiredMark, setRequiredMark] = React.useState(true);

<div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
    <span style={{ fontWeight: 500 }}>必填标记模式：</span>
    <Radio.Group value={requiredMark === true ? 'required' : requiredMark === false ? 'hidden' : 'optional'}
      onChange={(e) => {
        const val = e.target ? e.target.value : e;
        if (val === 'required') setRequiredMark(true);
        else if (val === 'hidden') setRequiredMark(false);
        else setRequiredMark('optional');
      }}
      options={[{ label: '显示星号 (true)', value: 'required' }, { label: '隐藏标记 (false)', value: 'hidden' }, { label: '可选标记 (optional)', value: 'optional' }]} />
  </div>
  <div style={{ maxWidth: 480 }}>
    <Form layout="vertical" requiredMark={requiredMark} onFinish={(v) => Message.success('提交成功')}>
      <Form.Item name="name" label="姓名" rules={[{ required: true, message: '请输入姓名' }]}>
        <Input placeholder="请输入姓名" />
      </Form.Item>
      <Form.Item name="email" label="邮箱" required>
        <Input placeholder="请输入邮箱" />
      </Form.Item>
      <Form.Item name="phone" label="手机号">
        <Input placeholder="请输入手机号（非必填）" />
      </Form.Item>
      <Form.Item name="address" label="地址">
        <Input placeholder="请输入地址（非必填）" />
      </Form.Item>
      <Form.Item><Button type="primary" htmlType="submit">提交</Button></Form.Item>
    </Form>
  </div>
</div>`;

export const advancedLayoutCode = `const [form] = Form.useForm();

<div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
  <div>
    <h4 style={{ marginBottom: 16 }}>自定义 labelCol / wrapperCol 比例</h4>
    <div style={{ maxWidth: 640 }}>
      <Form form={form} layout="horizontal" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} onFinish={(v) => Message.success('提交成功')}>
        <Form.Item name="field1" label="字段 1" rules={[{ required: true }]}>
          <Input placeholder="label=4, wrapper=20" />
        </Form.Item>
        <Form.Item name="field2" label="字段 2" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
          <Input placeholder="label=8, wrapper=16 (覆盖)" />
        </Form.Item>
        <Form.Item name="field3" label="字段 3" labelCol={{ span: 12 }} wrapperCol={{ span: 12 }}>
          <Input placeholder="label=12, wrapper=12 (覆盖)" />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <Button type="primary" htmlType="submit">提交</Button>
            <Button onClick={() => form.resetFields()}>重置</Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  </div>
  <div>
    <h4 style={{ marginBottom: 16 }}>标签对齐方式</h4>
    <div style={{ display: 'flex', gap: 40 }}>
      <div style={{ flex: 1, maxWidth: 320 }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#666' }}>labelAlign="right"（默认）</div>
        <Form layout="horizontal" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} labelAlign="right">
          <Form.Item name="a" label="姓名"><Input placeholder="右对齐" /></Form.Item>
          <Form.Item name="b" label="年龄"><Input placeholder="右对齐" /></Form.Item>
        </Form>
      </div>
      <div style={{ flex: 1, maxWidth: 320 }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#666' }}>labelAlign="left"</div>
        <Form layout="horizontal" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} labelAlign="left">
          <Form.Item name="c" label="姓名"><Input placeholder="左对齐" /></Form.Item>
          <Form.Item name="d" label="年龄"><Input placeholder="左对齐" /></Form.Item>
        </Form>
      </div>
    </div>
  </div>
</div>`;

export const dependenciesCode = `const [form] = Form.useForm();

<div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
  <div>
    <h4 style={{ marginBottom: 12 }}>密码确认联动</h4>
    <div style={{ maxWidth: 420 }}>
      <Form form={form} layout="vertical" onFinish={(v) => Message.success('密码设置成功')}>
        <Form.Item name="password" label="密码" rules={[{ required: true, message: '请输入密码' }]}>
          <Input.Password placeholder="请输入密码" />
        </Form.Item>
        <Form.Item name="confirmPassword" label="确认密码" dependencies={['password']}
          rules={[{ required: true, message: '请确认密码' }, {
            validator: (_rule, value) => {
              const password = form.getFieldValue('password');
              if (!value || password === value) return Promise.resolve();
              return Promise.reject(new Error('两次输入的密码不一致'));
            },
          }]}>
          <Input.Password placeholder="请再次输入密码" />
        </Form.Item>
        <Form.Item><Button type="primary" htmlType="submit">确认</Button></Form.Item>
      </Form>
    </div>
  </div>
  <div>
    <h4 style={{ marginBottom: 12 }}>条件字段显示</h4>
    <div style={{ maxWidth: 420 }}>
      <Form layout="vertical" onFinish={(v) => Message.success('注册成功')}>
        <Form.Item name="accountType" label="注册类型" rules={[{ required: true, message: '请选择注册类型' }]}>
          <Select placeholder="请选择" options={[{ label: '个人', value: 'personal' }, { label: '企业', value: 'company' }]} />
        </Form.Item>
        <Form.Item noStyle shouldUpdate={(prev, cur) => prev.accountType !== cur.accountType}>
          {() => {
            const accountType = form.getFieldValue('accountType');
            if (accountType === 'personal') return (
              <Form.Item name="idCard" label="身份证号" rules={[{ required: true, message: '请输入身份证号' }]}>
                <Input placeholder="请输入身份证号" />
              </Form.Item>
            );
            if (accountType === 'company') return (<>
              <Form.Item name="companyName" label="企业名称" rules={[{ required: true, message: '请输入企业名称' }]}>
                <Input placeholder="请输入企业名称" />
              </Form.Item>
              <Form.Item name="taxId" label="税号" rules={[{ required: true, message: '请输入税号' }]}>
                <Input placeholder="请输入税号" />
              </Form.Item>
            </>);
            return null;
          }}
        </Form.Item>
        <Form.Item><Button type="primary" htmlType="submit">注册</Button></Form.Item>
      </Form>
    </div>
  </div>
</div>`;

export const asyncValidationCode = `const [form] = Form.useForm();

const checkUsername = (_rule, value) => {
  if (!value) return Promise.resolve();
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const taken = ['admin', 'root', 'test', 'user'];
      if (taken.includes(value.toLowerCase())) reject(new Error(\`用户名 "\${value}" 已被注册\`));
      else resolve();
    }, 800);
  });
};
const checkEmail = (_rule, value) => {
  if (!value) return Promise.resolve();
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (value.toLowerCase() === 'taken@example.com') reject(new Error('该邮箱已被注册'));
      else resolve();
    }, 600);
  });
};

<div style={{ maxWidth: 480 }}>
  <p style={{ color: '#666', fontSize: 13, marginBottom: 16 }}>
    异步校验适用于需要服务端验证的场景。输入后失焦触发校验。
  </p>
  <Form form={form} layout="vertical" validateTrigger="onBlur" onFinish={(v) => Message.success('注册成功！')}>
    <Form.Item name="username" label="用户名" extra="不可用: admin、root、test、user"
      rules={[{ required: true, message: '请输入用户名' }, { min: 3, message: '至少3个字符' }, { asyncValidator: checkUsername }]}>
      <Input placeholder="输入后失焦触发校验" />
    </Form.Item>
    <Form.Item name="email" label="邮箱" extra="不可用: taken@example.com"
      rules={[{ required: true, message: '请输入邮箱' }, { type: 'email', message: '邮箱格式不正确' }, { asyncValidator: checkEmail }]}>
      <Input placeholder="输入邮箱后失焦触发校验" />
    </Form.Item>
    <Form.Item>
      <div style={{ display: 'flex', gap: 8 }}>
        <Button type="primary" htmlType="submit">注册</Button>
        <Button onClick={() => form.resetFields()}>重置</Button>
      </div>
    </Form.Item>
  </Form>
</div>`;

export const customControlCode = `const [form] = Form.useForm();

<div style={{ maxWidth: 560 }}>
  <Form form={form} layout="vertical"
    initialValues={{ enableNotify: true, gender: 'male', hobbies: ['reading'], satisfaction: 3, volume: 50 }}
    onFinish={(v) => { Message.success('提交成功！'); console.log(v); }}>
    <Form.Item name="nickname" label="昵称" rules={[{ required: true, message: '请输入昵称' }]}>
      <Input placeholder="请输入昵称" />
    </Form.Item>
    <Form.Item name="city" label="城市">
      <Select placeholder="请选择城市" options={[{ label: '北京', value: 'beijing' }, { label: '上海', value: 'shanghai' }, { label: '广州', value: 'guangzhou' }, { label: '深圳', value: 'shenzhen' }]} />
    </Form.Item>
    <Form.Item name="age" label="年龄">
      <InputNumber placeholder="请输入年龄" style={{ width: '100%' }} min={0} max={150} />
    </Form.Item>
    <Form.Item name="gender" label="性别">
      <Radio.Group options={[{ label: '男', value: 'male' }, { label: '女', value: 'female' }, { label: '保密', value: 'secret' }]} />
    </Form.Item>
    <Form.Item name="hobbies" label="兴趣爱好">
      <Checkbox.Group options={[{ label: '阅读', value: 'reading' }, { label: '运动', value: 'sports' }, { label: '音乐', value: 'music' }, { label: '旅行', value: 'travel' }]} />
    </Form.Item>
    <Form.Item name="enableNotify" label="开启通知" valuePropName="checked">
      <Switch />
    </Form.Item>
    <Form.Item name="satisfaction" label="满意度"><Rate /></Form.Item>
    <Form.Item name="volume" label="音量"><Slider /></Form.Item>
    <Form.Item name="bio" label="个人简介" rules={[{ max: 200, message: '简介不超过200字' }]}>
      <Input.TextArea placeholder="介绍一下自己..." rows={3} />
    </Form.Item>
    <Form.Item>
      <div style={{ display: 'flex', gap: 8 }}>
        <Button type="primary" htmlType="submit">提交</Button>
        <Button onClick={() => form.resetFields()}>重置</Button>
        <Button onClick={() => Message.info('当前值: ' + JSON.stringify(form.getFieldsValue(), null, 0))}>获取值</Button>
      </div>
    </Form.Item>
  </Form>
</div>`;
