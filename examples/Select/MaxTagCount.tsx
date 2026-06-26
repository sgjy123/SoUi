import React, { useState } from 'react';
import { Select } from '../../src';

export default () => {
  const options = [
    { label: 'React', value: 'react' },
    { label: 'Vue', value: 'vue' },
    { label: 'Angular', value: 'angular' },
    { label: 'Svelte', value: 'svelte' },
    { label: 'Solid', value: 'solid' },
    { label: 'Preact', value: 'preact' },
  ];

  const [value1, setValue1] = useState<string[]>(['react', 'vue', 'angular', 'svelte', 'solid']);
  const [value2, setValue2] = useState<string[]>(['react', 'vue', 'angular', 'svelte']);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400 }}>
      <div>
        <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>
          maxTagCount = 2（已选 {value1.length} 项）
        </p>
        <Select
          mode="multiple"
          maxTagCount={2}
          value={value1}
          onChange={(val) => setValue1(val as string[])}
          options={options}
          placeholder="请选择框架"
        />
      </div>
      <div>
        <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>
          maxTagCount = 3（已选 {value2.length} 项）
        </p>
        <Select
          mode="multiple"
          maxTagCount={3}
          value={value2}
          onChange={(val) => setValue2(val as string[])}
          options={options}
          placeholder="请选择框架"
        />
      </div>
      <div>
        <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>
          不设 maxTagCount（显示全部标签）
        </p>
        <Select
          mode="multiple"
          defaultValue={['react', 'vue', 'angular', 'svelte', 'solid']}
          options={options}
          placeholder="请选择框架"
        />
      </div>
    </div>
  );
};
