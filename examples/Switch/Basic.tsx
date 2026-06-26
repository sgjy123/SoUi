import React, { useState } from 'react';
import { Switch } from '../../src';

export default () => {
  const [checked, setChecked] = useState(true);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>基础用法</p>
        <Switch />
      </div>
      <div>
        <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>默认选中</p>
        <Switch defaultChecked />
      </div>
      <div>
        <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>受控模式</p>
        <Switch checked={checked} onChange={(val) => setChecked(val)} />
        <span style={{ marginLeft: 8, fontSize: 12, color: 'rgba(0,0,0,0.45)' }}>
          {checked ? '开' : '关'}
        </span>
      </div>
      <div>
        <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>禁用状态</p>
        <div style={{ display: 'flex', gap: 16 }}>
          <Switch disabled />
          <Switch disabled defaultChecked />
        </div>
      </div>
    </div>
  );
};
