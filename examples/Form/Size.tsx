import React from 'react';
import Form from '../../src/components/Form';
import Input from '../../src/components/Input';
import Select from '../../src/components/Select';
import Button from '../../src/components/Button';
import Message from '../../src/components/Message';

const Size: React.FC = () => {
  const [size, setSize] = React.useState<'small' | 'middle' | 'large'>('middle');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <span style={{ fontWeight: 500 }}>表单尺寸：</span>
        {(['small', 'middle', 'large'] as const).map((s) => (
          <Button
            key={s}
            type={size === s ? 'primary' : 'default'}
            onClick={() => setSize(s)}
          >
            {s}
          </Button>
        ))}
      </div>

      <div style={{ maxWidth: 480 }}>
        <Form
          layout="vertical"
          size={size}
          onFinish={(values) => Message.success(`[${size}] 提交成功`)}
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
              ]}
            />
          </Form.Item>

          <Form.Item
            name="desc"
            label="描述"
            rules={[{ required: true, message: '请输入描述' }]}
          >
            <Input.TextArea placeholder="请输入描述" rows={2} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              提交 ({size})
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Size;
