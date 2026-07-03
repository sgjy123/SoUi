import React, { useState } from 'react';
import Slider from '../../src/components/Slider';

const Event: React.FC = () => {
  const [changeValue, setChangeValue] = useState(30);
  const [completeValue, setCompleteValue] = useState(30);

  return (
    <div style={{ width: 400 }}>
      <p>onChange 实时值: {changeValue}</p>
      <p>onChangeComplete 完成值: {completeValue}</p>
      <Slider
        value={changeValue}
        onChange={(v) => setChangeValue(v as number)}
        onChangeComplete={(v) => setCompleteValue(v as number)}
      />
    </div>
  );
};

export default Event;
