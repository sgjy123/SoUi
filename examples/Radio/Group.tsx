import React, { useState } from 'react';
import { Radio } from '../../src';

export default () => {
  const [val1, setVal1] = useState('react');
  const [val2, setVal2] = useState('vue');

  const options = [
    { label: 'React', value: 'react' },
    { label: 'Vue', value: 'vue' },
    { label: 'Angular', value: 'angular' },
    { label: 'Svelte', value: 'svelte' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>通过 options 数据驱动（默认圆形）</p>
        <Radio.Group
          options={options}
          value={val1}
          onChange={(e) => setVal1(e.target.value as string)}
        />
      </div>
      <div>
        <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>按钮风格（outline）</p>
        <Radio.Group
          optionType="button"
          options={options}
          value={val2}
          onChange={(e) => setVal2(e.target.value as string)}
        />
      </div>
      <div>
        <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>按钮风格（solid 填色）</p>
        <Radio.Group
          optionType="button"
          buttonStyle="solid"
          options={options}
          defaultValue="react"
        />
      </div>
      <div>
        <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>子组件方式</p>
        <Radio.Group defaultValue="a">
          <Radio value="a">选项 A</Radio>
          <Radio value="b">选项 B</Radio>
          <Radio value="c">选项 C</Radio>
          <Radio value="d" disabled>选项 D</Radio>
        </Radio.Group>
      </div>
    </div>
  );
};
