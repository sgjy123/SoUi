import React, { useState } from 'react';
import { Radio } from '../../src';

export default () => {
  const [value, setValue] = useState('apple');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>基本用法</p>
        <Radio>选项 A</Radio>
      </div>
      <div>
        <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>默认选中</p>
        <Radio defaultChecked>默认选中</Radio>
      </div>
      <div>
        <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>受控模式：{value}</p>
        <Radio.Group value={value} onChange={(e) => setValue(e.target.value as string)}>
          <Radio value="apple">苹果</Radio>
          <Radio value="banana">香蕉</Radio>
          <Radio value="orange">橙子</Radio>
        </Radio.Group>
      </div>
      <div>
        <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>禁用状态</p>
        <Radio disabled>禁用未选</Radio>
        <Radio disabled checked style={{ marginLeft: 16 }}>禁用已选</Radio>
      </div>
    </div>
  );
};
