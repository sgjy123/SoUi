import React, { useState } from 'react';
import Slider from '../../src/components/Slider';

const Basic: React.FC = () => {
  const [value, setValue] = useState(30);

  return (
    <div style={{ width: 400 }}>
      <p>当前值: {value}</p>
      <Slider value={value} onChange={(v) => setValue(v as number)} />
      <Slider defaultValue={50} disabled style={{ marginTop: 24 }} />
    </div>
  );
};

export default Basic;
