import React, { useState } from 'react';
import { DatePicker, ConfigProvider } from '../../src';

export default () => {
  const [date, setDate] = useState<Date | null>(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* 默认主题 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ minWidth: 60, fontSize: 14 }}>默认：</span>
        <DatePicker value={date} onChange={setDate} />
      </div>

      {/* 绿色主题 */}
      <ConfigProvider
        theme={{
          components: {
            DatePicker: {
              colorPrimary: '#52c41a',
              borderRadius: 8,
              colorBorder: '#b7eb8f',
            },
          },
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ minWidth: 60, fontSize: 14 }}>绿色：</span>
          <DatePicker value={date} onChange={setDate} />
        </div>
      </ConfigProvider>

      {/* 紫色主题 */}
      <ConfigProvider
        theme={{
          components: {
            DatePicker: {
              colorPrimary: '#722ed1',
              borderRadius: 12,
              colorBorder: '#d3adf7',
            },
          },
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ minWidth: 60, fontSize: 14 }}>紫色：</span>
          <DatePicker value={date} onChange={setDate} />
        </div>
      </ConfigProvider>
    </div>
  );
};
