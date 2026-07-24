import React from 'react';
import { AutoComplete, Form, Button } from '../../src';

/** Form 表单集成 */
const FormExample = () => {
  const [form] = Form.useForm();
  const options = [
    { value: '北京市' },
    { value: '上海市' },
    { value: '广州市' },
    { value: '深圳市' },
    { value: '杭州市' },
  ];

  const onFinish = (values: any) => {
    console.log('表单值:', values);
  };

  return (
    <Form form={form} onFinish={onFinish} style={{ maxWidth: 400 }}>
      <Form.Item label="城市" name="city" rules={[{ required: true, message: '请选择城市' }]}>
        <AutoComplete options={options} placeholder="输入城市名" allowClear />
      </Form.Item>
      <Form.Item>
        <Button type="primary" onClick={() => form.submit()}>提交</Button>
      </Form.Item>
    </Form>
  );
};

export default FormExample;
