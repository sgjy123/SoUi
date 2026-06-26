import React, { useState } from 'react';
import { Checkbox } from '../../src';

export default () => {
  const [value, setValue] = useState<string[]>(['react', 'vue']);

  const options = [
    { label: 'React', value: 'react' },
    { label: 'Vue', value: 'vue' },
    { label: 'Angular', value: 'angular' },
    { label: 'Svelte', value: 'svelte' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>通过 options 数据驱动</p>
        <Checkbox.Group
          options={options}
          value={value}
          onChange={(val) => setValue(val as string[])}
        />
        <p style={{ marginTop: 8, fontSize: 12, color: 'rgba(0,0,0,0.45)' }}>
          已选: {value.join(', ') || '无'}
        </p>
      </div>
      <div>
        <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>子组件方式</p>
        <Checkbox.Group defaultValue={['a']}>
          <Checkbox value="a">选项 A</Checkbox>
          <Checkbox value="b">选项 B</Checkbox>
          <Checkbox value="c">选项 C</Checkbox>
          <Checkbox value="d" disabled>选项 D（禁用）</Checkbox>
        </Checkbox.Group>
      </div>
      <div>
        <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>禁用整组</p>
        <Checkbox.Group options={options} defaultValue={['react']} disabled />
      </div>
    </div>
  );
};
