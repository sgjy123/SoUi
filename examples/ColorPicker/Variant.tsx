import React, { useState } from 'react';
import { ColorPicker } from '../../src';

export default () => {
  const [color, setColor] = useState('');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ minWidth: 80, fontSize: 14 }}>可清除：</span>
        <ColorPicker value={color} onChange={setColor} allowClear />
      </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ minWidth: 80, fontSize: 14 }}>可清除不同大小：</span>
            <ColorPicker value={color} onChange={setColor} allowClear size='small' />
            <ColorPicker value={color} onChange={setColor} allowClear />
            <ColorPicker value={color} onChange={setColor} allowClear size='large' />
        </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ minWidth: 80, fontSize: 14 }}>显示文本：</span>
        <ColorPicker value="#52c41a" showText />
      </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ minWidth: 80, fontSize: 14 }}>显示文本不同大小：</span>
            <ColorPicker value="#52c41a" showText size="small" />
            <ColorPicker value="#52c41a" showText />
            <ColorPicker value="#52c41a" showText size="large" />
        </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ minWidth: 80, fontSize: 14 }}>禁用：</span>
        <ColorPicker value="#1677ff" disabled />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ minWidth: 80, fontSize: 14 }}>无透明度：</span>
        <ColorPicker value="#1677ff" disabledAlpha />
      </div>
    </div>
  );
};
