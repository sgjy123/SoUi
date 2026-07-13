import React from 'react';
import Form from '../../src/components/Form';
import Input from '../../src/components/Input';
import Button from '../../src/components/Button';
import Message from '../../src/components/Message';

const Inline: React.FC = () => {
  const [form] = Form.useForm();

  return (
    <div style={{ maxWidth: 700 }}>
      <Form
        form={form}
        layout="inline"
        onFinish={(values) => Message.success('登录成功！')}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: '请输入用户名' }]}
        >
          <Input placeholder="用户名" style={{ width: 160 }} />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input.Password placeholder="密码" style={{ width: 160 }} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Inline;
