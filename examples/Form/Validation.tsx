import React from 'react';
import Form from '../../src/components/Form';
import Input from '../../src/components/Input';
import InputNumber from '../../src/components/InputNumber';
import Button from '../../src/components/Button';
import Message from '../../src/components/Message';

const Validation: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    Message.success('校验通过，提交成功！');
    console.log('Form values:', values);
  };

  const onFinishFailed = (info: any) => {
    Message.error('校验失败，请检查输入');
    console.log('Validation failed:', info);
  };

  return (
    <div style={{ maxWidth: 520 }}>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          name="username"
          label="用户名"
          rules={[
            { required: true, message: '用户名不能为空' },
            { min: 3, max: 20, message: '用户名长度为3-20个字符' },
            {
              pattern: /^[a-zA-Z0-9_]+$/,
              message: '用户名只能包含字母、数字和下划线',
            },
          ]}
        >
          <Input placeholder="3-20位字母、数字或下划线" />
        </Form.Item>

        <Form.Item
          name="email"
          label="邮箱"
          rules={[
            { required: true, message: '邮箱不能为空' },
            { type: 'email', message: '请输入有效的邮箱地址' },
          ]}
        >
          <Input placeholder="example@email.com" />
        </Form.Item>

        <Form.Item
          name="phone"
          label="手机号"
          rules={[
            { required: true, message: '手机号不能为空' },
            { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号' },
          ]}
        >
          <Input placeholder="请输入手机号" />
        </Form.Item>

        <Form.Item
          name="age"
          label="年龄"
          rules={[
            { required: true, message: '年龄不能为空' },
            {
              validator: (_rule, value) => {
                if (value !== undefined && (value < 1 || value > 150)) {
                  return Promise.reject(new Error('请输入1-150之间的年龄'));
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <InputNumber placeholder="请输入年龄" style={{ width: '100%' }} min={1} max={150} />
        </Form.Item>

        <Form.Item
          name="website"
          label="个人网站"
          rules={[{ type: 'url', message: '请输入有效的URL地址' }]}
        >
          <Input placeholder="https://example.com" />
        </Form.Item>

        <Form.Item>
          <div style={{ display: 'flex', gap: 8 }}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
            <Button onClick={() => form.resetFields()}>重置</Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Validation;
