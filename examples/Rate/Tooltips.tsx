import React, { useState } from 'react';
import { Rate } from '../../src';

const descriptions = ['极差', '差', '一般', '好', '极好'];

export default () => {
  const [value, setValue] = useState(0);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <Rate
        tooltips={descriptions}
        value={value}
        onChange={setValue}
      />
      {value ? <span style={{ fontSize: 14 }}>{descriptions[value - 1]}</span> : null}
    </div>
  );
};
