import React, { useState } from 'react';
import { Cascader } from '../../src';

const options = [
  {
    value: 'zhejiang',
    label: '浙江',
    children: [
      {
        value: 'hangzhou',
        label: '杭州',
        children: [
          { value: 'xihu', label: '西湖区' },
          { value: 'binjiang', label: '滨江区' },
        ],
      },
      {
        value: 'ningbo',
        label: '宁波',
        children: [
          { value: 'haishu', label: '海曙区', disabled: true },
          { value: 'jiangbei', label: '江北区' },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: '江苏',
    children: [
      {
        value: 'nanjing',
        label: '南京',
        children: [
          { value: 'xuanwu', label: '玄武区' },
          { value: 'qinhuai', label: '秦淮区' },
        ],
      },
      {
        value: 'suzhou',
        label: '苏州',
        children: [
          { value: 'gusu', label: '姑苏区' },
          { value: 'wuzhong', label: '吴中区' },
        ],
      },
    ],
  },
];

export default () => {
  const [value1, setValue1] = useState<(string | number)[]>([]);
  const [value2, setValue2] = useState<(string | number)[]>(['zhejiang', 'hangzhou']);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400 }}>
      <div>
        <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>选择即改变（可选父级）</p>
        <Cascader
          options={options}
          changeOnSelect
          value={value1}
          onChange={(val) => setValue1(val)}
          placeholder="请选择（可点击任意层级）"
          allowClear
        />
        <p style={{ marginTop: 8, fontSize: 12, color: 'rgba(0,0,0,0.45)' }}>
          已选: {value1.join(' / ') || '无'}
        </p>
      </div>
      <div>
        <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>自定义显示渲染</p>
        <Cascader
          options={options}
          value={value2}
          onChange={(val) => setValue2(val)}
          displayRender={(labels) => labels.join(' > ')}
          placeholder="请选择地址"
        />
      </div>
      <div>
        <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>悬停展开</p>
        <Cascader
          options={options}
          expandTrigger="hover"
          placeholder="鼠标悬停展开子级"
        />
      </div>
      <div>
        <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>不同尺寸</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Cascader options={options} size="small" placeholder="小号" />
          <Cascader options={options} size="middle" placeholder="中号（默认）" />
          <Cascader options={options} size="large" placeholder="大号" />
        </div>
      </div>
    </div>
  );
};
