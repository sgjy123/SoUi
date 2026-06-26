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
          { value: 'binjiang', label: '滨江区' },
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
  const [value, setValue] = useState<(string | number)[][]>([
    ['zhejiang', 'hangzhou', 'xihu'],
    ['jiangsu', 'nanjing', 'xuanwu'],
  ]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 500 }}>
      <div>
        <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>多选模式</p>
        <Cascader
          multiple
          options={options}
          value={value}
          onChange={(val) => setValue(val as (string | number)[][])}
          placeholder="请选择地区（可多选）"
        />
        <p style={{ marginTop: 8, fontSize: 12, color: 'rgba(0,0,0,0.45)' }}>
          已选 {value.length} 项
        </p>
      </div>
      <div>
        <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>限制标签数量 (maxTagCount=2)</p>
        <Cascader
          multiple
          options={options}
          defaultValue={[
            ['zhejiang', 'hangzhou', 'xihu'],
            ['zhejiang', 'hangzhou', 'binjiang'],
            ['jiangsu', 'nanjing', 'xuanwu'],
          ]}
          maxTagCount={2}
          placeholder="请选择地区"
        />
      </div>
      <div>
        <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>多选 + 搜索</p>
        <Cascader
          multiple
          options={options}
          showSearch
          placeholder="搜索并多选地区"
        />
      </div>
      <div>
        <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>选择即改变 + 多选</p>
        <Cascader
          multiple
          changeOnSelect
          options={options}
          placeholder="可选择任意层级"
        />
      </div>
    </div>
  );
};
