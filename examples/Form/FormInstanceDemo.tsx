import React from 'react';
import Form from '../../src/components/Form';
import Input from '../../src/components/Input';
import Button from '../../src/components/Button';
import Message from '../../src/components/Message';

const FormInstanceDemo: React.FC = () => {
  const [form] = Form.useForm();

  const handleSetValues = () => {
    form.setFieldsValue({
      username: 'admin',
      email: 'admin@example.com',
      phone: '13800138000',
    });
    Message.info('已填充表单值');
  };

  const handleGetValues = () => {
    const values = form.getFieldsValue();
    Message.info('当前值: ' + JSON.stringify(values, null, 0));
    console.log('getFieldsValue:', values);
  };

  const handleGetValue = () => {
    const username = form.getFieldValue('username');
    Message.info(`username = ${username || '(空)'}`);
  };

  const handleValidate = async () => {
    try {
      const values = await form.validateFields();
      Message.success('校验通过: ' + JSON.stringify(values, null, 0));
    } catch (err: any) {
      Message.error(`校验失败，${err.errorFields?.length || 0} 个字段有错误`);
    }
  };

  const handleClearValidate = () => {
    form.clearValidate();
    Message.info('已清除所有校验状态');
  };

  const handleReset = () => {
    form.resetFields();
    Message.info('表单已重置');
  };

  const handleResetSingle = () => {
    form.resetFields(['email']);
    Message.info('已重置 email 字段');
  };

  const handleSubmit = () => {
    form.submit();
  };

  return (
    <div style={{ maxWidth: 520 }}>
      <Form
        form={form}
        layout="vertical"
        initialValues={{ username: '', email: '', phone: '' }}
        onFinish={(values) => {
          Message.success('提交成功！');
          console.log('Submit:', values);
        }}
        onFinishFailed={(info) => {
          Message.error(`提交失败，${info.errorFields.length} 个错误`);
        }}
      >
        <Form.Item
          name="username"
          label="用户名"
          rules={[{ required: true, message: '用户名不能为空' }]}
        >
          <Input placeholder="请输入用户名" />
        </Form.Item>

        <Form.Item
          name="email"
          label="邮箱"
          rules={[
            { required: true, message: '邮箱不能为空' },
            { type: 'email', message: '邮箱格式不正确' },
          ]}
        >
          <Input placeholder="请输入邮箱" />
        </Form.Item>

        <Form.Item name="phone" label="手机号">
          <Input placeholder="请输入手机号" />
        </Form.Item>
      </Form>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 8,
          marginTop: 16,
          padding: 16,
          background: '#f5f5f5',
          borderRadius: 6,
        }}
      >
        <Button onClick={handleSetValues}>setFieldsValue</Button>
        <Button onClick={handleGetValues}>getFieldsValue</Button>
        <Button onClick={handleGetValue}>getFieldValue</Button>
        <Button onClick={handleValidate}>validateFields</Button>
        <Button onClick={handleClearValidate}>clearValidate</Button>
        <Button onClick={handleReset}>resetFields</Button>
        <Button onClick={handleResetSingle}>resetFields(['email'])</Button>
        <Button type="primary" onClick={handleSubmit}>
          submit
        </Button>
      </div>
    </div>
  );
};

export default FormInstanceDemo;
