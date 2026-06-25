import React from 'react';
import { Select } from '../../src';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 300 }}>
    <Select
      placeholder="请选择一个选项"
      options={[
        { label: '选项一', value: 'option1' },
        { label: '选项二', value: 'option2' },
        { label: '选项三', value: 'option3' },
        { label: '选项四', value: 'option4' },
      ]}
      onChange={(value) => console.log('选中:', value)}
    />
    <Select
      placeholder="带默认值"
      defaultValue="option2"
      options={[
        { label: '选项一', value: 'option1' },
        { label: '选项二', value: 'option2' },
        { label: '选项三', value: 'option3' },
      ]}
    />
    <Select
      placeholder="禁用状态"
      disabled
      options={[
        { label: '选项一', value: 'option1' },
        { label: '选项二', value: 'option2' },
      ]}
    />
  </div>
);
