import React from 'react';
import { Select } from '../../src';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400 }}>
    <Select
      mode="multiple"
      placeholder="请选择多个选项"
      options={[
        { label: 'React', value: 'react' },
        { label: 'Vue', value: 'vue' },
        { label: 'Angular', value: 'angular' },
        { label: 'Svelte', value: 'svelte' },
        { label: 'Solid', value: 'solid' },
      ]}
      onChange={(value) => console.log('选中:', value)}
    />
    <Select
      mode="multiple"
      placeholder="带默认值的多选"
      defaultValue={['react', 'vue']}
      options={[
        { label: 'React', value: 'react' },
        { label: 'Vue', value: 'vue' },
        { label: 'Angular', value: 'angular' },
        { label: 'Svelte', value: 'svelte' },
      ]}
    />
  </div>
);
