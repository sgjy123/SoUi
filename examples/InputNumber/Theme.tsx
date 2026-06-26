import React, { useState } from 'react';
import { InputNumber, ConfigProvider } from '../../src';

export default () => {
  const [val, setVal] = useState<number | null>(10);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>绿色主题</p>
        <ConfigProvider
          theme={{
            primaryColor: '#52c41a',
            primaryHoverColor: '#73d13d',
            components: {
              InputNumber: {
                borderRadius: 8,
              },
            },
          }}
        >
          <InputNumber value={val} onChange={(v) => setVal(v)} min={0} max={100} />
        </ConfigProvider>
      </div>
      <div>
        <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>紫色主题 + 大圆角</p>
        <ConfigProvider
          theme={{
            primaryColor: '#722ed1',
            primaryHoverColor: '#9254de',
            components: {
              InputNumber: {
                borderRadius: 10,
                colorBorder: '#d3adf7',
                controlHeight: 38,
              },
            },
          }}
        >
          <div style={{ display: 'flex', gap: 12 }}>
            <InputNumber defaultValue={5} min={0} max={100} />
            <InputNumber defaultValue={20} prefix="¥" min={0} />
            <InputNumber defaultValue={50} disabled />
          </div>
        </ConfigProvider>
      </div>
    </div>
  );
};
