import React from 'react';
import { Mentions, Form, Button } from '../../src';

/** Form 表单集成 */
const FormExample = () => {
  const [form] = Form.useForm();
  const options = [
    { value: '张三', label: '张三' },
    { value: '李四', label: '李四' },
    { value: '王五', label: '王五' },
  ];

  const onFinish = (values: any) => {
    console.log('表单值:', values);
  };

  return (
    <Form form={form} onFinish={onFinish} style={{ maxWidth: 500 }}>
      <Form.Item label="评论" name="comment" rules={[{ required: true, message: '请输入评论内容' }]}>
        <Mentions options={options} placeholder="输入 @ 提及用户" rows={3} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" onClick={() => form.submit()}>提交</Button>
      </Form.Item>
    </Form>
  );
};

export default FormExample;
