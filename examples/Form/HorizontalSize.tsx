import React from 'react';
import Form from '../../src/components/Form';
import Input from '../../src/components/Input';
import Select from '../../src/components/Select';
import Button from '../../src/components/Button';
import Space from '../../src/components/Space';
import Message from '../../src/components/Message';

const HorizontalSize: React.FC = () => {
  const [formSmall] = Form.useForm();
  const [formMiddle] = Form.useForm();
  const [formLarge] = Form.useForm();

  const onFinish = (size: string) => (values: any) => {
    Message.success(`${size} 表单提交成功！`);
    console.log(`${size} 表单值:`, values);
  };

  return (
    <div style={{ maxWidth: 700 }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {/* Small 尺寸 */}
        <div>
          <h4 style={{ marginBottom: 16 }}>Small 尺寸</h4>
          <Form
            form={formSmall}
            layout="horizontal"
            size="small"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            onFinish={onFinish('Small')}
          >
            <Form.Item
              name="name"
              label="姓名"
              rules={[{ required: true, message: '请输入姓名' }]}
            >
              <Input placeholder="请输入姓名" />
            </Form.Item>

            <Form.Item
              name="role"
              label="角色"
              rules={[{ required: true, message: '请选择角色' }]}
            >
              <Select
                placeholder="请选择角色"
                options={[
                  { label: '管理员', value: 'admin' },
                  { label: '编辑者', value: 'editor' },
                  { label: '普通用户', value: 'user' },
                ]}
              />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
              <Space>
                <Button type="primary" htmlType="submit" size="small">
                  提交
                </Button>
                <Button onClick={() => formSmall.resetFields()} size="small">
                  重置
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </div>

        {/* Middle 尺寸（默认） */}
        <div>
          <h4 style={{ marginBottom: 16 }}>Middle 尺寸（默认）</h4>
          <Form
            form={formMiddle}
            layout="horizontal"
            size="middle"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            onFinish={onFinish('Middle')}
          >
            <Form.Item
              name="name"
              label="姓名"
              rules={[{ required: true, message: '请输入姓名' }]}
            >
              <Input placeholder="请输入姓名" />
            </Form.Item>

            <Form.Item
              name="role"
              label="角色"
              rules={[{ required: true, message: '请选择角色' }]}
            >
              <Select
                placeholder="请选择角色"
                options={[
                  { label: '管理员', value: 'admin' },
                  { label: '编辑者', value: 'editor' },
                  { label: '普通用户', value: 'user' },
                ]}
              />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
              <Space>
                <Button type="primary" htmlType="submit" size="middle">
                  提交
                </Button>
                <Button onClick={() => formMiddle.resetFields()} size="middle">
                  重置
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </div>

        {/* Large 尺寸 */}
        <div>
          <h4 style={{ marginBottom: 16 }}>Large 尺寸</h4>
          <Form
            form={formLarge}
            layout="horizontal"
            size="large"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            onFinish={onFinish('Large')}
          >
            <Form.Item
              name="name"
              label="姓名"
              rules={[{ required: true, message: '请输入姓名' }]}
            >
              <Input placeholder="请输入姓名" />
            </Form.Item>

            <Form.Item
              name="role"
              label="角色"
              rules={[{ required: true, message: '请选择角色' }]}
            >
              <Select
                placeholder="请选择角色"
                options={[
                  { label: '管理员', value: 'admin' },
                  { label: '编辑者', value: 'editor' },
                  { label: '普通用户', value: 'user' },
                ]}
              />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
              <Space>
                <Button type="primary" htmlType="submit" size="large">
                  提交
                </Button>
                <Button onClick={() => formLarge.resetFields()} size="large">
                  重置
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </div>
      </Space>
    </div>
  );
};

export default HorizontalSize;
