import React, { useState } from 'react';
import Form from '../../src/components/Form';
import Input from '../../src/components/Input';
import Select from '../../src/components/Select';
import InputNumber from '../../src/components/InputNumber';
import Switch from '../../src/components/Switch';
import Segmented from '../../src/components/Segmented';
import Button from '../../src/components/Button';
import Message from '../../src/components/Message';

const Disabled: React.FC = () => {
  const [disabled, setDisabled] = useState(true);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <span style={{ fontWeight: 500 }}>表单禁用：</span>
        <Switch checked={disabled} onChange={setDisabled} />
        <span style={{ color: '#999', fontSize: 12 }}>
          {disabled ? '已禁用 — 所有字段不可编辑' : '已启用 — 可正常编辑'}
        </span>
      </div>

      <div style={{ maxWidth: 520 }}>
        <Form
          layout="horizontal"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          disabled={disabled}
          initialValues={{
            username: 'readonly_user',
            email: 'user@example.com',
            role: 'admin',
            age: 25,
            view: 'list',
          }}
          onFinish={(v) => Message.success('提交成功')}
        >
          <Form.Item name="username" label="用户名" rules={[{ required: true }]}>
            <Input placeholder="用户名" />
          </Form.Item>

          <Form.Item name="email" label="邮箱">
            <Input placeholder="邮箱" />
          </Form.Item>

          <Form.Item name="role" label="角色">
            <Select
              options={[
                { label: '管理员', value: 'admin' },
                { label: '编辑者', value: 'editor' },
                { label: '普通用户', value: 'user' },
              ]}
            />
          </Form.Item>

          <Form.Item name="age" label="年龄">
            <InputNumber placeholder="年龄" style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item name="view" label="视图模式">
            <Segmented
              options={[
                { label: '列表', value: 'list' },
                { label: '网格', value: 'grid' },
                { label: '画廊', value: 'gallery' },
              ]}
            />
          </Form.Item>

          <Form.Item
            name="bio"
            label="简介"
          >
            <Input.TextArea placeholder="个人简介" rows={2} />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
            <div style={{ display: 'flex', gap: 8 }}>
              <Button type="primary" htmlType="submit" disabled={disabled}>
                提交
              </Button>
              <Button onClick={() => setDisabled(!disabled)}>
                {disabled ? '启用表单' : '禁用表单'}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Disabled;
