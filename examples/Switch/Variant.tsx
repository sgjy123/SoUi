import React, { useState } from 'react';
import { Switch } from '../../src';

export default () => {
  const [checked1, setChecked1] = useState(true);
  const [checked2, setChecked2] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>两种尺寸</p>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <Switch defaultChecked />
          <Switch defaultChecked size="small" />
        </div>
      </div>
      <div>
        <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>带文字内容</p>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <Switch
            checked={checked1}
            onChange={setChecked1}
            checkedChildren="开"
            unCheckedChildren="关"
          />
          <Switch
            checked={checked2}
            onChange={setChecked2}
            checkedChildren="ON"
            unCheckedChildren="OFF"
          />
          <Switch
            checkedChildren="1"
            unCheckedChildren="0"
            size="small"
          />
        </div>
      </div>
      <div>
        <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>自定义样式</p>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <Switch
            defaultChecked
            style={{ '--soui-switch-color-primary': '#52c41a' } as React.CSSProperties}
          />
          <Switch
            defaultChecked
            style={{ '--soui-switch-color-primary': '#fa541c' } as React.CSSProperties}
          />
          <Switch
            defaultChecked
            style={{ '--soui-switch-border-radius': '4px' } as React.CSSProperties}
          />
        </div>
      </div>
    </div>
  );
};
