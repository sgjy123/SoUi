import React from 'react';
import { Select } from '../../src';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 300 }}>
    <Select
      showSearch
      placeholder="搜索选项"
      options={[
        { label: '苹果', value: 'apple' },
        { label: '香蕉', value: 'banana' },
        { label: '橙子', value: 'orange' },
        { label: '葡萄', value: 'grape' },
        { label: '西瓜', value: 'watermelon' },
        { label: '芒果', value: 'mango' },
      ]}
      onSearch={(value) => console.log('搜索:', value)}
    />
    <Select
      showSearch
      mode="multiple"
      placeholder="多选 + 搜索"
      options={[
        { label: 'JavaScript', value: 'js' },
        { label: 'TypeScript', value: 'ts' },
        { label: 'Python', value: 'py' },
        { label: 'Rust', value: 'rs' },
        { label: 'Go', value: 'go' },
      ]}
    />
  </div>
);
