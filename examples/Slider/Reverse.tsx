import React, { useState } from 'react';
import Slider from '../../src/components/Slider';

const Reverse: React.FC = () => {
  const [value, setValue] = useState(30);

  return (
    <div style={{ width: 400 }}>
      <p>当前值: {value}</p>
      <Slider
        value={value}
        onChange={(v) => setValue(v as number)}
        reverse
      />
      <Slider
        range
        defaultValue={[20, 80]}
        reverse
        style={{ marginTop: 24 }}
      />
    </div>
  );
};

export default Reverse;
