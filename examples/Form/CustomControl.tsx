import React, { useState } from 'react';
import Form from '../../src/components/Form';
import Input from '../../src/components/Input';
import Select from '../../src/components/Select';
import InputNumber from '../../src/components/InputNumber';
import Switch from '../../src/components/Switch';
import Radio from '../../src/components/Radio';
import Checkbox from '../../src/components/Checkbox';
import Button from '../../src/components/Button';
import Slider from '../../src/components/Slider';
import Rate from '../../src/components/Rate';
import Message from '../../src/components/Message';

const CustomControl: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    Message.success('提交成功！');
    console.log('Form values:', values);
  };

  return (
    <div style={{ maxWidth: 560 }}>
      <p style={{ color: '#666', fontSize: 13, marginBottom: 16 }}>
        Form.Item 自动注入 value / onChange 给子控件，兼容所有 SoUi 表单组件。
      </p>

      <Form
        form={form}
        layout="vertical"
        initialValues={{
          enableNotify: true,
          gender: 'male',
          hobbies: ['reading'],
          satisfaction: 3,
          volume: 50,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="nickname"
          label="昵称"
          rules={[{ required: true, message: '请输入昵称' }]}
        >
          <Input placeholder="请输入昵称" />
        </Form.Item>

        <Form.Item name="city" label="城市">
          <Select
            placeholder="请选择城市"
            options={[
              { label: '北京', value: 'beijing' },
              { label: '上海', value: 'shanghai' },
              { label: '广州', value: 'guangzhou' },
              { label: '深圳', value: 'shenzhen' },
            ]}
          />
        </Form.Item>

        <Form.Item name="age" label="年龄">
          <InputNumber placeholder="请输入年龄" style={{ width: '100%' }} min={0} max={150} />
        </Form.Item>

        <Form.Item name="gender" label="性别">
          <Radio.Group
            options={[
              { label: '男', value: 'male' },
              { label: '女', value: 'female' },
              { label: '保密', value: 'secret' },
            ]}
          />
        </Form.Item>

        <Form.Item name="hobbies" label="兴趣爱好">
          <Checkbox.Group
            options={[
              { label: '阅读', value: 'reading' },
              { label: '运动', value: 'sports' },
              { label: '音乐', value: 'music' },
              { label: '旅行', value: 'travel' },
            ]}
          />
        </Form.Item>

        <Form.Item name="enableNotify" label="开启通知" valuePropName="checked">
          <Switch />
        </Form.Item>

        <Form.Item name="satisfaction" label="满意度">
          <Rate />
        </Form.Item>

        <Form.Item name="volume" label="音量">
          <Slider />
        </Form.Item>

        <Form.Item
          name="bio"
          label="个人简介"
          rules={[{ max: 200, message: '简介不超过200字' }]}
        >
          <Input.TextArea placeholder="介绍一下自己..." rows={3} />
        </Form.Item>

        <Form.Item>
          <div style={{ display: 'flex', gap: 8 }}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
            <Button onClick={() => form.resetFields()}>重置</Button>
            <Button
              onClick={() => {
                const values = form.getFieldsValue();
                Message.info('当前值: ' + JSON.stringify(values, null, 0));
              }}
            >
              获取值
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CustomControl;
