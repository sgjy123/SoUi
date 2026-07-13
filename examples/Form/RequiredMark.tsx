import React, { useState } from 'react';
import Form from '../../src/components/Form';
import Input from '../../src/components/Input';
import Button from '../../src/components/Button';
import Radio from '../../src/components/Radio';
import Message from '../../src/components/Message';

const RequiredMark: React.FC = () => {
  const [requiredMark, setRequiredMark] = useState<boolean | 'optional'>(true);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <span style={{ fontWeight: 500 }}>必填标记模式：</span>
        <Radio.Group
          value={requiredMark === true ? 'required' : requiredMark === false ? 'hidden' : 'optional'}
          onChange={(e: any) => {
            const val = e.target ? e.target.value : e;
            if (val === 'required') setRequiredMark(true);
            else if (val === 'hidden') setRequiredMark(false);
            else setRequiredMark('optional');
          }}
          options={[
            { label: '显示星号 (true)', value: 'required' },
            { label: '隐藏标记 (false)', value: 'hidden' },
            { label: '可选标记 (optional)', value: 'optional' },
          ]}
        />
      </div>

      <div style={{ maxWidth: 480 }}>
        <Form
          layout="vertical"
          requiredMark={requiredMark}
          onFinish={(v) => Message.success('提交成功')}
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
            required
          >
            <Input placeholder="请输入邮箱" />
          </Form.Item>

          <Form.Item
            name="phone"
            label="手机号"
          >
            <Input placeholder="请输入手机号（非必填）" />
          </Form.Item>

          <Form.Item
            name="address"
            label="地址"
          >
            <Input placeholder="请输入地址（非必填）" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default RequiredMark;
