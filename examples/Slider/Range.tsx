import React, { useState } from 'react';
import Slider from '../../src/components/Slider';

const Range: React.FC = () => {
  const [value, setValue] = useState<[number, number]>([20, 60]);

  return (
    <div style={{ width: 400 }}>
      <p>当前范围: {value[0]} - {value[1]}</p>
      <Slider range value={value} onChange={(v) => setValue(v as [number, number])} />
      <Slider range defaultValue={[10, 80]} disabled style={{ marginTop: 24 }} />
    </div>
  );
};

export default Range;
