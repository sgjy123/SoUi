import React from 'react';
import { Segmented } from '../../src';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    <div>
      <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>基本用法（默认选中第一项）</p>
      <Segmented options={['日', '周', '月', '季', '年']} />
    </div>
    <div>
      <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>默认选中指定项</p>
      <Segmented defaultValue="月" options={['日', '周', '月', '季', '年']} />
    </div>
    <div>
      <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>对象配置选项</p>
      <Segmented
        defaultValue="pending"
        options={[
          { label: '待处理', value: 'pending' },
          { label: '进行中', value: 'processing' },
          { label: '已完成', value: 'done' },
        ]}
      />
    </div>
  </div>
);
