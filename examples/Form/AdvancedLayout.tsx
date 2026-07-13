import React from 'react';
import Form from '../../src/components/Form';
import Input from '../../src/components/Input';
import Select from '../../src/components/Select';
import Button from '../../src/components/Button';
import Message from '../../src/components/Message';

const AdvancedLayout: React.FC = () => {
  const [form] = Form.useForm();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
      {/* 自定义 labelCol / wrapperCol */}
      <div>
        <h4 style={{ marginBottom: 16 }}>自定义 labelCol / wrapperCol 比例</h4>
        <div style={{ maxWidth: 640 }}>
          <Form
            form={form}
            layout="horizontal"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            onFinish={(v) => Message.success('提交成功')}
          >
            <Form.Item name="field1" label="字段 1" rules={[{ required: true }]}>
              <Input placeholder="label=4, wrapper=20" />
            </Form.Item>
            <Form.Item
              name="field2"
              label="字段 2"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
            >
              <Input placeholder="label=8, wrapper=16 (覆盖)" />
            </Form.Item>
            <Form.Item
              name="field3"
              label="字段 3"
              labelCol={{ span: 12 }}
              wrapperCol={{ span: 12 }}
            >
              <Input placeholder="label=12, wrapper=12 (覆盖)" />
            </Form.Item>
            <Form.Item
              wrapperCol={{ offset: 4, span: 20 }}
            >
              <div style={{ display: 'flex', gap: 8 }}>
                <Button type="primary" htmlType="submit">提交</Button>
                <Button onClick={() => form.resetFields()}>重置</Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>

      {/* 标签左对齐 vs 右对齐 */}
      <div>
        <h4 style={{ marginBottom: 16 }}>标签对齐方式</h4>
        <div style={{ display: 'flex', gap: 40 }}>
          <div style={{ flex: 1, maxWidth: 320 }}>
            <div style={{ marginBottom: 8, fontSize: 13, color: '#666' }}>labelAlign="right"（默认）</div>
            <Form layout="horizontal" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} labelAlign="right">
              <Form.Item name="a" label="姓名"><Input placeholder="右对齐" /></Form.Item>
              <Form.Item name="b" label="年龄"><Input placeholder="右对齐" /></Form.Item>
            </Form>
          </div>
          <div style={{ flex: 1, maxWidth: 320 }}>
            <div style={{ marginBottom: 8, fontSize: 13, color: '#666' }}>labelAlign="left"</div>
            <Form layout="horizontal" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} labelAlign="left">
              <Form.Item name="c" label="姓名"><Input placeholder="左对齐" /></Form.Item>
              <Form.Item name="d" label="年龄"><Input placeholder="左对齐" /></Form.Item>
            </Form>
          </div>
        </div>
      </div>

      {/* 表单项级别 labelAlign */}
      <div>
        <h4 style={{ marginBottom: 16 }}>字段级别 labelAlign 覆盖</h4>
        <div style={{ maxWidth: 480 }}>
          <Form layout="horizontal" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
            <Form.Item name="x" label="默认对齐" labelAlign="right">
              <Input placeholder="右对齐 (默认)" />
            </Form.Item>
            <Form.Item name="y" label="左对齐" labelAlign="left">
              <Input placeholder="左对齐 (覆盖)" />
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AdvancedLayout;
