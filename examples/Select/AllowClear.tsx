import React, { useState } from 'react';
import { Select } from '../../src';

export default () => {
  const [singleValue, setSingleValue] = useState<string>('option2');
  const [multiValue, setMultiValue] = useState<string[]>(['react', 'vue']);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 300 }}>
      <div>
        <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>单选可清空</p>
        <Select
          placeholder="请选择"
          allowClear
          value={singleValue}
          onChange={(val) => setSingleValue(val as string)}
          options={[
            { label: '选项一', value: 'option1' },
            { label: '选项二', value: 'option2' },
            { label: '选项三', value: 'option3' },
          ]}
        />
      </div>
      <div>
        <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>多选可清空</p>
        <Select
          mode="multiple"
          placeholder="请选择"
          allowClear
          value={multiValue}
          onChange={(val) => setMultiValue(val as string[])}
          options={[
            { label: 'React', value: 'react' },
            { label: 'Vue', value: 'vue' },
            { label: 'Angular', value: 'angular' },
            { label: 'Svelte', value: 'svelte' },
          ]}
        />
      </div>
      <div>
        <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>带搜索 + 可清空</p>
        <Select
          placeholder="搜索并选择"
          allowClear
          showSearch
          options={[
            { label: '苹果', value: 'apple' },
            { label: '香蕉', value: 'banana' },
            { label: '橙子', value: 'orange' },
            { label: '葡萄', value: 'grape' },
          ]}
        />
      </div>
    </div>
  );
};
