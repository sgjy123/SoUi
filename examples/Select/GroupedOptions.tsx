import React from 'react';
import { Select } from '../../src';
import type { GroupedOptionType } from '../../src';

export default () => {
  // 分组选项数据
  const groupedOptions: GroupedOptionType[] = [
    {
      label: '热门城市',
      children: [
        { label: '北京', value: 'beijing' },
        { label: '上海', value: 'shanghai' },
        { label: '广州', value: 'guangzhou' },
        { label: '深圳', value: 'shenzhen' },
      ],
    },
    {
      label: '其他城市',
      children: [
        { label: '杭州', value: 'hangzhou' },
        { label: '南京', value: 'nanjing' },
        { label: '成都', value: 'chengdu' },
        { label: '武汉', value: 'wuhan' },
      ],
    },
  ];

  // 混合：普通选项 + 分组选项
  const mixedOptions: GroupedOptionType[] = [
    { label: '全部', value: 'all' },
    {
      label: '前端框架',
      children: [
        { label: 'React', value: 'react' },
        { label: 'Vue', value: 'vue' },
        { label: 'Angular', value: 'angular' },
      ],
    },
    {
      label: '后端框架',
      children: [
        { label: 'Express', value: 'express' },
        { label: 'Koa', value: 'koa' },
        { label: 'NestJS', value: 'nestjs' },
      ],
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 300 }}>
      <div>
        <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>分组选择器</p>
        <Select
          placeholder="请选择城市"
          options={groupedOptions}
          showSearch
        />
      </div>
      <div>
        <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>混合选项（普通 + 分组）</p>
        <Select
          placeholder="请选择技术栈"
          options={mixedOptions}
          showSearch
        />
      </div>
      <div>
        <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>多选 + 分组</p>
        <Select
          mode="multiple"
          placeholder="选择多个城市"
          options={groupedOptions}
          showSearch
        />
      </div>
    </div>
  );
};
