import React from 'react';
import Form from '../../src/components/Form';
import Input from '../../src/components/Input';
import Button from '../../src/components/Button';
import Space from '../../src/components/Space';
import Message from '../../src/components/Message';

const DynamicFields: React.FC = () => {
  const [form] = Form.useForm();

  return (
    <div style={{ maxWidth: 560 }}>
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          contacts: [{ name: '', email: '' }],
        }}
        onFinish={(values) => {
          Message.success('提交成功！');
          console.log('提交值:', values);
        }}
      >
        <Form.Item
          name="company"
          label="公司名称"
          rules={[{ required: true, message: '请输入公司名称' }]}
        >
          <Input placeholder="请输入公司名称" />
        </Form.Item>

        <Form.List name="contacts">
          {(fields, { add, remove }) => (
            <>
              <div style={{ marginBottom: 8, fontWeight: 500, color: 'rgba(0,0,0,0.85)' }}>
                联系人列表
              </div>

              {fields.map((field) => (
                <div
                  key={field.key}
                  style={{
                    display: 'flex',
                    gap: 12,
                    marginBottom: 12,
                    alignItems: 'flex-start',
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ marginBottom: 8 }}>
                      <Form.Item
                          name={[field.name, 'name']}
                          rules={[{ required: true, message: '请输入姓名' }]}
                          noStyle
                      >
                        <Input placeholder="联系人姓名" />
                      </Form.Item>
                    </div>
                    <div style={{ marginBottom: 8 }}>
                      <Form.Item
                      name={[field.name, 'email']}
                      rules={[
                        { required: true, message: '请输入邮箱' },
                        { type: 'email', message: '邮箱格式不正确' },
                      ]}
                      noStyle
                    >
                      <Input placeholder="联系人邮箱" />
                    </Form.Item>
                    </div>
                  </div>
                  <Button
                    type="default"
                    danger
                    onClick={() => remove(field.name)}
                    disabled={fields.length <= 1}
                    style={{ marginTop: 2 }}
                  >
                    删除
                  </Button>
                </div>
              ))}

              <Button
                type="default"
                onClick={() => add({ name: '', email: '' })}
                style={{ width: '100%', borderStyle: 'dashed' }}
              >
                + 添加联系人
              </Button>
            </>
          )}
        </Form.List>

        <Form.Item style={{ marginTop: 24 }}>
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

export default DynamicFields;
