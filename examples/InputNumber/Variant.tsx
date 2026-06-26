import React, { useState } from 'react';
import { InputNumber } from '../../src';

export default () => {
  const [val1, setVal1] = useState<number | null>(null);
  const [val2, setVal2] = useState<number | null>(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>错误状态</p>
        <InputNumber
          status="error"
          value={val1}
          onChange={(v) => setVal1(v)}
          placeholder="请输入正数"
          min={0}
        />
      </div>
      <div>
        <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>警告状态</p>
        <InputNumber
          status="warning"
          value={val2}
          onChange={(v) => setVal2(v)}
          placeholder="库存预警"
          min={0}
        />
      </div>
      <div>
        <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>自定义格式化（百分比）</p>
        <InputNumber
          defaultValue={50}
          min={0}
          max={100}
          formatter={(v) => `${v}%`}
          parser={(v) => parseFloat((v || '').replace('%', ''))}
          style={{ width: 160 }}
        />
      </div>
      <div>
        <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>自定义格式化（千分位）</p>
        <InputNumber
          defaultValue={1000000}
          min={0}
          formatter={(v) =>
            `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          }
          parser={(v) => parseFloat((v || '').replace(/,/g, ''))}
          style={{ width: 200 }}
        />
      </div>
    </div>
  );
};
