import React, { useState } from 'react';
import { ColorPicker } from '../../src';
import type { PresetColorGroup } from '../../src';

const brandPresets: PresetColorGroup[] = [
  {
    label: '品牌色',
    colors: ['#1677ff', '#52c41a', '#fa8c16', '#f5222d', '#722ed1'],
  },
  {
    label: '柔和色',
    colors: ['#ff9a9e', '#fad0c4', '#a18cd1', '#fbc2eb', '#84fab0'],
  },
  {
    label: '灰阶',
    colors: ['#000000', '#333333', '#666666', '#999999', '#cccccc', '#ffffff'],
  },
];

export default () => {
  const [color, setColor] = useState('#1677ff');

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <ColorPicker value={color} onChange={setColor} presets={brandPresets} />
      <span style={{ fontSize: 14, color: 'rgba(0,0,0,0.45)' }}>{color}</span>
    </div>
  );
};
