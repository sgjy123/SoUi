import React, { useState } from 'react';
import { ColorPicker } from '../../src';

export default () => {
  const [color, setColor] = useState('#1677ff');

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <ColorPicker
        value={color}
        onChange={setColor}
        format="rgb"
        showText
      />
      <span style={{ fontSize: 14, color: 'rgba(0,0,0,0.45)' }}>{color}</span>
    </div>
  );
};
