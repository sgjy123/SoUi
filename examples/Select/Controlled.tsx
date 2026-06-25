import React, { useState } from 'react';
import { Select, Button, Space } from '../../src';

export default () => {
  const [value, setValue] = useState<string>('option1');
  const [multiValue, setMultiValue] = useState<string[]>(['react', 'vue']);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400 }}>
      <div>
        <p style={{ marginBottom: 8 }}>当前单选值：{value || '无'}</p>
        <Select
          value={value}
          onChange={(val) => setValue(val as string)}
          options={[
            { label: '选项一', value: 'option1' },
            { label: '选项二', value: 'option2' },
            { label: '选项三', value: 'option3' },
          ]}
        />
        <Space style={{ marginTop: 8 }}>
          <Button size="small" onClick={() => setValue('option1')}>选项一</Button>
          <Button size="small" onClick={() => setValue('option2')}>选项二</Button>
          <Button size="small" onClick={() => setValue('')}>清空</Button>
        </Space>
      </div>
      <div>
        <p style={{ marginBottom: 8 }}>当前多选值：{multiValue.join(', ') || '无'}</p>
        <Select
          mode="multiple"
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
    </div>
  );
};
