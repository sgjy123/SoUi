import React, { useState } from 'react';
import Slider from '../../src/components/Slider';

const Vertical: React.FC = () => {
  const [val, setVal] = useState(30);
  const [range, setRange] = useState<[number, number]>([20, 70]);

  return (
    <div style={{ display: 'flex', gap: 32, height: 260, alignItems: 'flex-start' }}>
      <Slider orientation="vertical" value={val} onChange={(v) => setVal(v as number)} />
      <Slider orientation="vertical" range value={range} onChange={(v) => setRange(v as [number, number])} />
      <Slider orientation="vertical" defaultValue={50} disabled />
      <Slider orientation="vertical" marks={{ 0: '0', 50: '50', 100: '100' }} defaultValue={50} />
    </div>
  );
};

export default Vertical;
