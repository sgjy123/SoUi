import React, { useState } from 'react';
import { ColorPicker } from '../../src';
import type { ColorPickerPlacement } from '../../src';

const placements: ColorPickerPlacement[] = ['bottomLeft', 'bottomRight', 'topLeft', 'topRight'];
const labels: Record<ColorPickerPlacement, string> = {
  bottomLeft: '左下',
  bottomRight: '右下',
  topLeft: '左上',
  topRight: '右上',
};

export default () => {
  const [color, setColor] = useState('#1677ff');

  return (
    <div
      style={{
        display: 'flex',
        gap: 16,
        padding: '280px 20px',
        justifyContent: 'center',
      }}
    >
      {placements.map((p) => (
        <div key={p} style={{ textAlign: 'center' }}>
          <ColorPicker value={color} onChange={setColor} placement={p} />
          <div style={{ marginTop: 8, fontSize: 12, color: 'rgba(0,0,0,0.45)' }}>
            {labels[p]}
          </div>
        </div>
      ))}
    </div>
  );
};
