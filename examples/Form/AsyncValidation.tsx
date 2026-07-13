import React from 'react';
import Form from '../../src/components/Form';
import Input from '../../src/components/Input';
import Button from '../../src/components/Button';
import Message from '../../src/components/Message';

const AsyncValidation: React.FC = () => {
  const [form] = Form.useForm();

  // 模拟异步校验用户名是否已存在
  const checkUsername = (_rule: any, value: string) => {
    if (!value) return Promise.resolve();
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        const taken = ['admin', 'root', 'test', 'user'];
        if (taken.includes(value.toLowerCase())) {
          reject(new Error(`用户名 "${value}" 已被注册`));
        } else {
          resolve();
        }
      }, 800);
    });
  };

  // 模拟异步校验邮箱是否已注册
  const checkEmail = (_rule: any, value: string) => {
    if (!value) return Promise.resolve();
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (value.toLowerCase() === 'taken@example.com') {
          reject(new Error('该邮箱已被注册'));
        } else {
          resolve();
        }
      }, 600);
    });
  };

  // 验证码校验（模拟服务端校验）
  const checkVerifyCode = (_rule: any, value: string) => {
    if (!value) return Promise.resolve();
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (value !== '1234') {
          reject(new Error('验证码不正确'));
        } else {
          resolve();
        }
      }, 500);
    });
  };

  return (
    <div style={{ maxWidth: 480 }}>
      <p style={{ color: '#666', fontSize: 13, marginBottom: 16 }}>
        异步校验适用于需要服务端验证的场景（如用户名是否已注册）。输入后失焦触发校验，观察延迟效果。
      </p>

      <Form
        form={form}
        layout="vertical"
        validateTrigger="onBlur"
        onFinish={(v) => Message.success('注册成功！')}
      >
        <Form.Item
          name="username"
          label="用户名"
          extra="可用: zhangsan、lisi；不可用: admin、root、test、user"
          rules={[
            { required: true, message: '请输入用户名' },
            { min: 3, message: '至少3个字符' },
            {
              asyncValidator: checkUsername,
              message: '用户名已被占用',
            },
          ]}
        >
          <Input placeholder="输入后失焦触发校验" />
        </Form.Item>

        <Form.Item
          name="email"
          label="邮箱"
          extra="不可用: taken@example.com"
          rules={[
            { required: true, message: '请输入邮箱' },
            { type: 'email', message: '邮箱格式不正确' },
            {
              asyncValidator: checkEmail,
              message: '邮箱已被注册',
            },
          ]}
        >
          <Input placeholder="输入邮箱后失焦触发校验" />
        </Form.Item>

        <Form.Item
          name="code"
          label="验证码"
          extra="正确验证码: 1234"
          rules={[
            { required: true, message: '请输入验证码' },
            {
              asyncValidator: checkVerifyCode,
              message: '验证码错误',
            },
          ]}
        >
          <Input placeholder="输入验证码后失焦校验" />
        </Form.Item>

        <Form.Item>
          <div style={{ display: 'flex', gap: 8 }}>
            <Button type="primary" htmlType="submit">
              注册
            </Button>
            <Button onClick={() => form.resetFields()}>重置</Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AsyncValidation;
