import React from 'react';
import Form from '../../src/components/Form';
import Input from '../../src/components/Input';
import Button from '../../src/components/Button';
import Icon from '../../src/components/Icon';
import Message from '../../src/components/Message';

const DynamicFields: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    Message.success('提交成功！');
    console.log('Form values:', values);
  };

  return (
    <div style={{ maxWidth: 520 }}>
      <Form
        form={form}
        layout="vertical"
        initialValues={{ contacts: [{ name: '', phone: '' }] }}
        onFinish={onFinish}
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
              <div style={{ marginBottom: 8, fontWeight: 500, fontSize: 14 }}>
                联系人列表
              </div>
              {fields.map((field, index) => (
                <div
                  key={field.key}
                  style={{
                    display: 'flex',
                    gap: 8,
                    marginBottom: 12,
                    alignItems: 'flex-start',
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <Form.Item
                      name={[field.name, 'name']}
                      rules={[{ required: true, message: '请输入联系人姓名' }]}
                      noStyle
                    >
                      <Input placeholder="联系人姓名" />
                    </Form.Item>
                  </div>
                  <div style={{ flex: 1 }}>
                    <Form.Item
                      name={[field.name, 'phone']}
                      rules={[{ required: true, message: '请输入手机号' }]}
                      noStyle
                    >
                      <Input placeholder="手机号" />
                    </Form.Item>
                  </div>
                  <Button
                    type="default"
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
                onClick={() => add({ name: '', phone: '' })}
                style={{ width: '100%', borderStyle: 'dashed' }}
              >
                + 添加联系人
              </Button>
            </>
          )}
        </Form.List>

        <Form.Item style={{ marginTop: 24 }}>
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

export default DynamicFields;
