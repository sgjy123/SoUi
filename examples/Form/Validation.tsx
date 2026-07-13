import React from 'react';
import Form from '../../src/components/Form';
import Input from '../../src/components/Input';
import Button from '../../src/components/Button';
import Space from '../../src/components/Space';
import Message from '../../src/components/Message';

const Validation: React.FC = () => {
  const [form] = Form.useForm();

  return (
    <div style={{ maxWidth: 520 }}>
      <Form
        form={form}
        layout="vertical"
        onFinish={(v) => Message.success('校验通过！')}
        onFinishFailed={() => Message.error('请修正表单中的错误')}
      >
        <Form.Item
          name="username"
          label="用户名"
          rules={[
            { required: true, message: '用户名不能为空' },
            { min: 3, max: 20, message: '用户名 3-20 个字符' },
            { pattern: /^[a-zA-Z0-9_]+$/, message: '只能包含字母、数字和下划线' },
          ]}
        >
          <Input placeholder="3-20位字母、数字或下划线" />
        </Form.Item>

        <Form.Item
          name="email"
          label="邮箱"
          rules={[
            { required: true, message: '邮箱不能为空' },
            { type: 'email', message: '请输入有效的邮箱' },
          ]}
        >
          <Input placeholder="example@email.com" />
        </Form.Item>

        <Form.Item
          name="phone"
          label="手机号"
          rules={[
            { required: true, message: '手机号不能为空' },
            { type: 'phone', message: '请输入有效的手机号' },
          ]}
        >
          <Input placeholder="请输入手机号" />
        </Form.Item>

        <Form.Item
          name="age"
          label="年龄"
          rules={[
            { type: 'number', message: '请输入数字' },
            { min: 18, message: '年龄不能小于18岁' },
            { max: 120, message: '年龄不能超过120岁' },
          ]}
        >
          <Input placeholder="18-120之间的数字" />
        </Form.Item>

        <Form.Item
          name="website"
          label="个人网站"
          rules={[{ type: 'url', message: '请输入有效的网址' }]}
        >
          <Input placeholder="https://example.com" />
        </Form.Item>

        <Form.Item
          name="password"
          label="密码"
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
          ]}
        >
          <Input.Password placeholder="至少6位，包含字母和数字" />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="确认密码"
          dependencies={['password']}
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
          ]}
        >
          <Input.Password placeholder="再次输入密码" />
        </Form.Item>

        <Form.Item
          name="inviteCode"
          label="邀请码"
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
          ]}
        >
          <Input placeholder="输入邀请码（试试 SOUI2024）" />
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

export default Validation;
