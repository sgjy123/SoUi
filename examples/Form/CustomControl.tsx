import React from 'react';
import Form from '../../src/components/Form';
import Input from '../../src/components/Input';
import InputNumber from '../../src/components/InputNumber';
import Select from '../../src/components/Select';
import Radio from '../../src/components/Radio';
import Checkbox from '../../src/components/Checkbox';
import Switch from '../../src/components/Switch';
import Slider from '../../src/components/Slider';
import Rate from '../../src/components/Rate';
import DatePicker from '../../src/components/DatePicker';
import TimePicker from '../../src/components/TimePicker';
import Cascader from '../../src/components/Cascader';
import ColorPicker from '../../src/components/ColorPicker';
import TreeSelect from '../../src/components/TreeSelect';
import Transfer from '../../src/components/Transfer';
import Upload from '../../src/components/Upload';
import Button from '../../src/components/Button';
import Message from '../../src/components/Message';

const cityOptions = [
  {
    label: '浙江省',
    value: 'zhejiang',
    children: [
      {
        label: '杭州市',
        value: 'hangzhou',
        children: [
          { label: '西湖区', value: 'xihu' },
          { label: '滨江区', value: 'binjiang' },
        ],
      },
      {
        label: '宁波市',
        value: 'ningbo',
        children: [
          { label: '海曙区', value: 'haishu' },
          { label: '鄞州区', value: 'yinzhou' },
        ],
      },
    ],
  },
  {
    label: '江苏省',
    value: 'jiangsu',
    children: [
      {
        label: '南京市',
        value: 'nanjing',
        children: [
          { label: '玄武区', value: 'xuanwu' },
          { label: '鼓楼区', value: 'gulou' },
        ],
      },
    ],
  },
];

const treeData = [
  {
    label: '技术部',
    value: 'tech',
    children: [
      { label: '前端组', value: 'frontend' },
      { label: '后端组', value: 'backend' },
      { label: '测试组', value: 'testing' },
    ],
  },
  {
    label: '产品部',
    value: 'product',
    children: [
      { label: '产品设计', value: 'design' },
      { label: '产品运营', value: 'operation' },
    ],
  },
];

const transferData = Array.from({ length: 10 }).map((_, i) => ({
  key: String(i),
  title: `选项 ${i + 1}`,
  description: `选项 ${i + 1} 的描述`,
}));

const CustomControl: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    Message.success('提交成功！');
    console.log('Form values:', values);
  };

  return (
    <div style={{ maxWidth: 600 }}>
      <p style={{ color: '#666', fontSize: 13, marginBottom: 16 }}>
        Form.Item 自动注入 value / onChange 给子控件，兼容所有 SoUi 表单组件。
      </p>

      <Form
        form={form}
        layout="vertical"
        initialValues={{
          nickname: '',
          city: undefined,
          age: undefined,
          gender: 'male',
          hobbies: ['reading'],
          enableNotify: true,
          satisfaction: 3,
          volume: 50,
          birthday: null,
          alarmTime: null,
          address: [],
          themeColor: '#1677ff',
          department: undefined,
          assignedItems: ['1', '3'],
          avatar: [],
          bio: '',
        }}
        onFinish={onFinish}
      >
        {/* 1. Input */}
        <Form.Item
          name="nickname"
          label="昵称"
          rules={[{ required: true, message: '请输入昵称' }]}
        >
          <Input placeholder="请输入昵称" />
        </Form.Item>

        {/* 2. Select */}
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

        {/* 3. InputNumber */}
        <Form.Item name="age" label="年龄">
          <InputNumber
            placeholder="请输入年龄"
            style={{ width: '100%' }}
            min={0}
            max={150}
          />
        </Form.Item>

        {/* 4. Radio.Group */}
        <Form.Item name="gender" label="性别">
          <Radio.Group
            options={[
              { label: '男', value: 'male' },
              { label: '女', value: 'female' },
              { label: '保密', value: 'secret' },
            ]}
          />
        </Form.Item>

        {/* 5. Checkbox.Group */}
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

        {/* 6. Switch */}
        <Form.Item name="enableNotify" label="开启通知" valuePropName="checked">
          <Switch />
        </Form.Item>

        {/* 7. Rate */}
        <Form.Item name="satisfaction" label="满意度">
          <Rate />
        </Form.Item>

        {/* 8. Slider */}
        <Form.Item name="volume" label="音量">
          <Slider />
        </Form.Item>

        {/* 9. DatePicker */}
        <Form.Item name="birthday" label="出生日期">
          <DatePicker placeholder="请选择日期" style={{ width: '100%' }} />
        </Form.Item>

        {/* 10. TimePicker */}
        <Form.Item name="alarmTime" label="提醒时间">
          <TimePicker placeholder="请选择时间" style={{ width: '100%' }} />
        </Form.Item>

        {/* 11. Cascader */}
        <Form.Item name="address" label="所在地区">
          <Cascader
            options={cityOptions}
            placeholder="请选择省市区"
            changeOnSelect
          />
        </Form.Item>

        {/* 12. ColorPicker */}
        <Form.Item name="themeColor" label="主题颜色">
          <ColorPicker />
        </Form.Item>

        {/* 13. TreeSelect */}
        <Form.Item name="department" label="所属部门">
          <TreeSelect
            treeData={treeData}
            placeholder="请选择部门"
            allowClear
            style={{ width: '100%' }}
          />
        </Form.Item>

        {/* 14. Transfer */}
        <Form.Item name="assignedItems" label="穿梭框" valuePropName="targetKeys">
          <Transfer
            dataSource={transferData}
            titles={['待选项', '已选项']}
            render={(item: any) => item.title}
            listStyle={{ width: 230, height: 300 }}
          />
        </Form.Item>

        {/* 15. Upload */}
        <Form.Item name="avatar" label="上传附件" valuePropName="fileList">
          <Upload action="#">
            <Button>点击上传</Button>
          </Upload>
        </Form.Item>

        {/* 16. TextArea */}
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
