import React, { useState } from 'react';
import { Cascader } from '../../src';
import type { CascaderOption } from '../../src';

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

// Async loading options
const asyncOptions: CascaderOption[] = [
  { value: 'zhejiang', label: '浙江', isLeaf: false },
  { value: 'jiangsu', label: '江苏', isLeaf: false },
];

export default () => {
  const [asyncOpts, setAsyncOpts] = useState<CascaderOption[]>(asyncOptions);

  const loadData = (selectedOptions: CascaderOption[]) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];

    // Simulate async loading
    setTimeout(() => {
      const newOpts = [...asyncOpts];
      const targetIdx = newOpts.findIndex((o) => o.value === targetOption.value);
      if (targetIdx >= 0) {
        newOpts[targetIdx] = {
          ...newOpts[targetIdx],
          children: [
            { value: `${targetOption.value}-city1`, label: `${targetOption.label}城市1`, isLeaf: true },
            { value: `${targetOption.value}-city2`, label: `${targetOption.label}城市2`, isLeaf: true },
          ],
        };
        setAsyncOpts(newOpts);
      }
    }, 1000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400 }}>
      <div>
        <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>可搜索</p>
        <Cascader
          options={options}
          showSearch
          placeholder="输入关键词搜索"
        />
      </div>
      <div>
        <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>异步加载</p>
        <Cascader
          options={asyncOpts}
          loadData={loadData}
          changeOnSelect
          placeholder="点击展开加载子级"
        />
      </div>
      <div>
        <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>状态校验</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Cascader options={options} status="error" placeholder="错误状态" />
          <Cascader options={options} status="warning" placeholder="警告状态" />
        </div>
      </div>
    </div>
  );
};
