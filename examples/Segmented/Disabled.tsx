import React from 'react';
import { Segmented } from '../../src';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
    <div>
      <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>禁用单个选项</p>
      <Segmented
        defaultValue="week"
        options={[
          { label: '日', value: 'day' },
          { label: '周', value: 'week', disabled: true },
          { label: '月', value: 'month' },
          { label: '季', value: 'quarter' },
        ]}
      />
    </div>
    <div>
      <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>整体禁用</p>
      <Segmented disabled defaultValue="week" options={['日', '周', '月', '季', '年']} />
    </div>
  </div>
);
