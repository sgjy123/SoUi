import React, { useState } from 'react';
import { ColorPicker } from '../../src';

export default () => {
  const [color, setColor] = useState('#1677ff');

  return (
    <div style={{ display: 'flex', gap: 24 }}>
      {/* 自定义按钮触发器 */}
      <ColorPicker value={color} onChange={setColor}>
        <button
          type="button"
          style={{
            padding: '6px 16px',
            background: color,
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            cursor: 'pointer',
            fontSize: 14,
          }}
        >
          选择颜色
        </button>
      </ColorPicker>

      {/* 自定义色块触发器 */}
      <ColorPicker value={color} onChange={setColor}>
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 6,
            background: color,
            border: '2px solid #d9d9d9',
            cursor: 'pointer',
            transition: 'border-color 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = color)}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#d9d9d9')}
        />
      </ColorPicker>
    </div>
  );
};
