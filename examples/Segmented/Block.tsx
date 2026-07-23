import React from 'react';
import { Segmented } from '../../src';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    <p style={{ marginBottom: 0, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>撑满父容器宽度，选项等分</p>
    <Segmented block options={['日', '周', '月', '季', '年']} />
    <Segmented
      block
      size="large"
      options={[
        { label: '待处理', value: 'pending' },
        { label: '进行中', value: 'processing' },
        { label: '已完成', value: 'done' },
      ]}
    />
  </div>
);
