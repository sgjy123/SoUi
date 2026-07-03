import React, { useState } from 'react';
import Slider from '../../src/components/Slider';

const Tooltip: React.FC = () => {
  const [value, setValue] = useState(30);

  return (
    <div style={{ width: 400 }}>
      <p>当前值: {value}%</p>
      <Slider
        value={value}
        onChange={(v) => setValue(v as number)}
        tooltip={{
          open: true,
          formatter: (v) => `${v}%`,
        }}
      />
      <Slider
        defaultValue={60}
        tooltip={{
          formatter: (v) => `温度: ${v}°C`,
        }}
        style={{ marginTop: 24 }}
      />
    </div>
  );
};

export default Tooltip;
