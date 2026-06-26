import React, { useState } from 'react';
import { Switch } from '../../src';

export default () => {
  const [loading, setLoading] = useState(true);
  const [checked, setChecked] = useState(true);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>加载中状态</p>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <Switch loading defaultChecked />
          <Switch loading />
          <Switch loading size="small" defaultChecked />
        </div>
      </div>
      <div>
        <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>切换加载状态</p>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <Switch
            loading={loading}
            checked={checked}
            onChange={(val) => setChecked(val)}
          />
          <Switch
            loading={loading}
            checked={checked}
            onChange={(val) => setChecked(val)}
            size="small"
          />
          <button
            style={{
              padding: '4px 12px',
              borderRadius: 4,
              border: '1px solid #d9d9d9',
              cursor: 'pointer',
              fontSize: 12,
            }}
            onClick={() => setLoading(!loading)}
          >
            {loading ? '关闭加载' : '开启加载'}
          </button>
        </div>
      </div>
    </div>
  );
};
