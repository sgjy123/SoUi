import React from 'react';
import Form from '../../src/components/Form';
import Input from '../../src/components/Input';
import Button from '../../src/components/Button';
import ConfigProvider from '../../src/components/ConfigProvider';
import Message from '../../src/components/Message';

const ThemeConfig: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    Message.success('提交成功！');
    console.log('Form values:', values);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {/* 绿色主题 */}
      <div>
        <h4 style={{ marginBottom: 12 }}>绿色主题</h4>
        <ConfigProvider
          theme={{
            primaryColor: '#52c41a',
            components: {
              Form: {
                colorPrimary: '#52c41a',
                colorError: '#fa541c',
                labelFontSize: 13,
              },
            },
          }}
        >
          <div style={{ maxWidth: 400 }}>
            <Form form={form} layout="vertical" onFinish={onFinish}>
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
          </div>
        </ConfigProvider>
      </div>

      {/* 大号字体 */}
      <div>
        <h4 style={{ marginBottom: 12 }}>大号字体</h4>
        <ConfigProvider
          theme={{
            components: {
              Form: {
                fontSize: 16,
                labelFontSize: 15,
              },
            },
          }}
        >
          <div style={{ maxWidth: 400 }}>
            <Form layout="vertical" onFinish={onFinish}>
              <Form.Item
                name="title"
                label="标题"
                rules={[{ required: true, message: '请输入标题' }]}
              >
                <Input placeholder="请输入标题" size="large" />
              </Form.Item>
              <Form.Item
                name="content"
                label="内容"
              >
                <Input.TextArea placeholder="请输入内容" rows={3} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" size="large">
                  提交
                </Button>
              </Form.Item>
            </Form>
          </div>
        </ConfigProvider>
      </div>
    </div>
  );
};

export default ThemeConfig;
