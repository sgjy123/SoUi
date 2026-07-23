import React from 'react';
import { Segmented, Icon } from '../../src';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
    <div>
      <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>图标 + 文字</p>
      <Segmented
        defaultValue="list"
        options={[
          { label: '列表', value: 'list', icon: <Icon name="List" size={14} /> },
          { label: '网格', value: 'grid', icon: <Icon name="GridTwo" size={14} /> },
          { label: '画廊', value: 'gallery', icon: <Icon name="Picture" size={14} /> },
        ]}
      />
    </div>
    <div>
      <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>纯图标</p>
      <Segmented
        defaultValue="left"
        options={[
          { value: 'left', icon: <Icon name="AlignTextLeft" size={16} /> },
          { value: 'center', icon: <Icon name="AlignTextCenter" size={16} /> },
          { value: 'right', icon: <Icon name="AlignTextRight" size={16} /> },
        ]}
      />
    </div>
  </div>
);
