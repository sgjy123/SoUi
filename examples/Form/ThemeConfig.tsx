import React from 'react';
import Form from '../../src/components/Form';
import Input from '../../src/components/Input';
import Button from '../../src/components/Button';
import ConfigProvider from '../../src/components/ConfigProvider';
import Message from '../../src/components/Message';

const ThemeConfig: React.FC = () => {
  return (
    <div style={{ maxWidth: 480 }}>
      {/* 绿色主题 */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#666' }}>绿色成功主题</div>
        <ConfigProvider
          theme={{
            primaryColor: '#52c41a',
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
          <Form
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
                { type: 'email', message: '邮箱格式不正确' },
              ]}
            >
              <Input placeholder="请输入邮箱" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ background: '#52c41a', borderColor: '#52c41a' }}>
                提交
              </Button>
            </Form.Item>
          </Form>
        </ConfigProvider>
      </div>

      {/* 暖色警告主题 */}
      <div>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#666' }}>暖色警告主题</div>
        <ConfigProvider
          theme={{
            primaryColor: '#faad14',
            components: {
              Form: {
                colorPrimary: '#faad14',
                colorError: '#ff4d4f',
                labelFontSize: 14,
                borderRadius: 12,
              },
            },
          }}
        >
          <Form
            layout="vertical"
            onFinish={(v) => Message.success('提交成功！')}
          >
            <Form.Item
              name="account"
              label="账户"
              rules={[{ required: true, message: '请输入账户' }]}
            >
              <Input placeholder="请输入账户" />
            </Form.Item>
            <Form.Item
              name="password"
              label="密码"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input.Password placeholder="请输入密码" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ background: '#faad14', borderColor: '#faad14', color: '#fff' }}>
                提交
              </Button>
            </Form.Item>
          </Form>
        </ConfigProvider>
      </div>
    </div>
  );
};

export default ThemeConfig;
