import React from 'react';
import Slider from '../../src/components/Slider';

const marks: Record<number, any> = {
  0: '0°C',
  26: '26°C',
  37: '37°C',
  100: {
    label: '100°C',
    style: { color: '#f50' },
  },
};

const Marks: React.FC = () => (
  <div style={{ width: 400 }}>
    <p>带刻度标记</p>
    <Slider marks={marks} defaultValue={37} dots />
    <p style={{ marginTop: 32 }}>仅可选标记点</p>
    <Slider marks={marks} step={null} defaultValue={26} />
  </div>
);

export default Marks;
