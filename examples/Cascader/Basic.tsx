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
          { value: 'xihu', label: '西湖区', disabled: true },
          { value: 'binjiang', label: '滨江区', children: [{ value: 'binjiang1', label: '滨江街道' }] },
          { value: 'yuhang', label: '余杭区' },
        ],
      },
      {
        value: 'ningbo',
        label: '宁波',
        children: [
          { value: 'haishu', label: '海曙区' },
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
          { value: 'gulou', label: '鼓楼区' },
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
  {
    value: 'fujian',
    label: '福建',
    children: [
      {
        value: 'fuzhou',
        label: '福州',
        children: [
          { value: 'gulou', label: '鼓楼区' },
          { value: 'taijiang', label: '台江区' },
        ],
      },
    ],
  },
];

export default () => {
  const [value, setValue] = useState<(string | number)[]>(['zhejiang', 'hangzhou', 'xihu']);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400 }}>
      <div>
        <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>基础用法</p>
        <Cascader
          options={options}
          placeholder="请选择地址"
          onChange={(val) => setValue(val)}
        />
      </div>
      <div>
        <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>受控模式</p>
        <Cascader
          options={options}
          value={value}
          onChange={(val) => setValue(val)}
          placeholder="请选择地址"
        />
        <p style={{ marginTop: 8, fontSize: 12, color: 'rgba(0,0,0,0.45)' }}>
          已选: {value.join(' / ')}
        </p>
      </div>
      <div>
        <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>默认值</p>
        <Cascader
          options={options}
          defaultValue={['jiangsu', 'nanjing', 'xuanwu']}
          placeholder="请选择地址"
        />
      </div>
      <div>
        <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>禁用状态</p>
        <Cascader
          options={options}
          defaultValue={['zhejiang', 'hangzhou', 'binjiang']}
          disabled
          placeholder="请选择地址"
        />
      </div>
    </div>
  );
};
