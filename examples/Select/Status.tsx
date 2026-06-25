import React, { useState } from 'react';
import { Select } from '../../src';

export default () => {
  const [value1, setValue1] = useState<string>('');
  const [value2, setValue2] = useState<string>('option1');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 300 }}>
      <div>
        <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>error 状态（必填校验未通过）</p>
        <Select
          placeholder="请选择一个选项"
          status="error"
          value={value1}
          onChange={(val) => setValue1(val as string)}
          options={[
            { label: '选项一', value: 'option1' },
            { label: '选项二', value: 'option2' },
            { label: '选项三', value: 'option3' },
          ]}
        />
      </div>
      <div>
        <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>warning 状态</p>
        <Select
          placeholder="请选择一个选项"
          status="warning"
          value={value2}
          onChange={(val) => setValue2(val as string)}
          options={[
            { label: '选项一', value: 'option1' },
            { label: '选项二', value: 'option2' },
            { label: '选项三', value: 'option3' },
          ]}
        />
      </div>
      <div>
        <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>多选 + error 状态</p>
        <Select
          mode="multiple"
          placeholder="至少选择两项"
          status="error"
          options={[
            { label: 'React', value: 'react' },
            { label: 'Vue', value: 'vue' },
            { label: 'Angular', value: 'angular' },
          ]}
        />
      </div>
    </div>
  );
};
