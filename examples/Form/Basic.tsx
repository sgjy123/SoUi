import React, { useState } from 'react';
import Form from '../../src/components/Form';
import Input from '../../src/components/Input';
import Select from '../../src/components/Select';
import Button from '../../src/components/Button';
import Radio from '../../src/components/Radio';
import Switch from '../../src/components/Switch';
import Message from '../../src/components/Message';

const Basic: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    Message.success('提交成功！' + JSON.stringify(values, null, 2));
  };

  return (
    <div style={{ maxWidth: 520 }}>
      <Form
        form={form}
        layout="horizontal"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        initialValues={{ gender: 'male', remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          label="用户名"
          rules={[{ required: true, message: '请输入用户名' }]}
        >
          <Input placeholder="请输入用户名" />
        </Form.Item>

        <Form.Item
          name="password"
          label="密码"
          rules={[
            { required: true, message: '请输入密码' },
            { min: 6, message: '密码至少6个字符' },
          ]}
        >
          <Input.Password placeholder="请输入密码" />
        </Form.Item>

        <Form.Item name="gender" label="性别">
          <Radio.Group
            options={[
              { label: '男', value: 'male' },
              { label: '女', value: 'female' },
            ]}
          />
        </Form.Item>

        <Form.Item name="role" label="角色">
          <Select
            placeholder="请选择角色"
            options={[
              { label: '管理员', value: 'admin' },
              { label: '编辑者', value: 'editor' },
              { label: '普通用户', value: 'user' },
            ]}
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
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

const Space: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ display: 'flex', gap: 8 }}>{children}</div>
);

export default Basic;
