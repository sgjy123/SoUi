import React, { useState } from 'react';
import Slider from '../../src/components/Slider';

const Vertical: React.FC = () => {
  const [val, setVal] = useState(30);
  const [range, setRange] = useState<[number, number]>([20, 70]);

  const marks = {
    0: '0',
    25: '25',
    50: '50',
    75: '75',
    100: '100',
  };

  const temperatureMarks = {
    0: '0°C',
    26: '26°C',
    37: '37°C',
    100: { label: '100°C', style: { color: '#f50' } },
  };

  return (
    <div style={{ display: 'flex', gap: 48, height: 300, alignItems: 'flex-start' }}>
      {/* 基础垂直滑块 */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, height: '100%' }}>
        <Slider orientation="vertical" value={val} onChange={(v) => setVal(v as number)} />
        <span style={{ fontSize: 12, color: '#666' }}>基础</span>
      </div>

      {/* 垂直范围滑块 */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, height: '100%' }}>
        <Slider orientation="vertical" range value={range} onChange={(v) => setRange(v as [number, number])} />
        <span style={{ fontSize: 12, color: '#666' }}>范围</span>
      </div>

      {/* 垂直滑块带刻度标记 */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, height: '100%' }}>
        <Slider orientation="vertical" marks={marks} defaultValue={50} dots />
        <span style={{ fontSize: 12, color: '#666' }}>带刻度</span>
      </div>

      {/* 垂直滑块带自定义刻度 */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, height: '100%' }}>
        <Slider orientation="vertical" marks={temperatureMarks} defaultValue={37} />
        <span style={{ fontSize: 12, color: '#666' }}>温度</span>
      </div>

      {/* 垂直禁用滑块 */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, height: '100%' }}>
        <Slider orientation="vertical" defaultValue={50} disabled />
        <span style={{ fontSize: 12, color: '#666' }}>禁用</span>
      </div>
    </div>
  );
};

export default Vertical;
