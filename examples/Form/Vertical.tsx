import React from 'react';
import Form from '../../src/components/Form';
import Input from '../../src/components/Input';
import Button from '../../src/components/Button';
import Space from '../../src/components/Space';
import Message from '../../src/components/Message';

const Vertical: React.FC = () => {
  const [form] = Form.useForm();

  return (
    <div style={{ maxWidth: 400 }}>
      <Form
        form={form}
        layout="vertical"
        onFinish={(v) => Message.success('提交成功！')}
      >
        <Form.Item
          name="name"
          label="姓名"
          rules={[{ required: true, message: '请输入姓名' }]}
        >
          <Input placeholder="请输入姓名" />
        </Form.Item>

        <Form.Item
          name="email"
          label="邮箱"
          rules={[
            { required: true, message: '请输入邮箱' },
            { type: 'email', message: '请输入有效的邮箱地址' },
          ]}
        >
          <Input placeholder="example@email.com" />
        </Form.Item>

        <Form.Item name="address" label="地址">
          <Input.TextArea placeholder="请输入地址" rows={3} />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
            <Button onClick={() => form.resetFields()}>重置</Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Vertical;
