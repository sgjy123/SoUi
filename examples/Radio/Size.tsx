import React, { useState } from 'react';
import { Radio } from '../../src';

export default () => {
  const [size, setSize] = useState<'small' | 'middle' | 'large'>('middle');
  const [btnVal, setBtnVal] = useState('react');

  const options = [
    { label: 'React', value: 'react' },
    { label: 'Vue', value: 'vue' },
    { label: 'Angular', value: 'angular' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div>
        <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>按钮尺寸</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Radio.Group
            optionType="button"
            size="small"
            options={options}
            value={btnVal}
            onChange={(e) => setBtnVal(e.target.value as string)}
          />
          <Radio.Group
            optionType="button"
            size="middle"
            options={options}
            value={btnVal}
            onChange={(e) => setBtnVal(e.target.value as string)}
          />
          <Radio.Group
            optionType="button"
            size="large"
            options={options}
            value={btnVal}
            onChange={(e) => setBtnVal(e.target.value as string)}
          />
        </div>
      </div>
      <div>
        <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>圆形尺寸</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Radio.Group size="small" options={options} defaultValue="react" />
          <Radio.Group size="middle" options={options} defaultValue="react" />
          <Radio.Group size="large" options={options} defaultValue="react" />
        </div>
      </div>
    </div>
  );
};
