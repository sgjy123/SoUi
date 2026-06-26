import React, { useState } from 'react';
import { InputNumber } from '../../src';

export default () => {
  const [val, setVal] = useState<number | null>(3);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>基础用法</p>
        <InputNumber defaultValue={3} min={1} max={10} />
      </div>
      <div>
        <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>受控模式</p>
        <InputNumber value={val} onChange={(v) => setVal(v)} />
        <span style={{ marginLeft: 12, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>当前值: {val}</span>
      </div>
      <div>
        <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>步进 0.1，精度 2 位</p>
        <InputNumber defaultValue={1.5} step={0.1} precision={2} min={0} max={5} />
      </div>
      <div>
        <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>禁用 / 只读</p>
        <div style={{ display: 'flex', gap: 12 }}>
          <InputNumber defaultValue={5} disabled />
          <InputNumber defaultValue={5} readOnly />
        </div>
      </div>
    </div>
  );
};
