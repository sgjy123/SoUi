import React from 'react';
import { Segmented } from '../../src';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
    <div>
      <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>大尺寸 large</p>
      <Segmented size="large" options={['日', '周', '月', '季', '年']} />
    </div>
    <div>
      <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>中尺寸 middle（默认）</p>
      <Segmented size="middle" options={['日', '周', '月', '季', '年']} />
    </div>
    <div>
      <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>小尺寸 small</p>
      <Segmented size="small" options={['日', '周', '月', '季', '年']} />
    </div>
  </div>
);
