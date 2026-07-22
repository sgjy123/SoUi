import React, { useState } from 'react';
import { Carousel, Radio } from '../../src';
import type { CarouselDotPosition } from '../../src';

const slideStyle: React.CSSProperties = {
  height: 160,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#fff',
  fontSize: 20,
};

const colors = ['#1677ff', '#52c41a', '#faad14', '#ff4d4f'];

export default () => {
  const [position, setPosition] = useState<CarouselDotPosition>('bottom');

  return (
    <div>
      <Radio.Group value={position} onChange={(e) => setPosition(e.target.value)} style={{ marginBottom: 16 }}>
        <Radio value="top">Top</Radio>
        <Radio value="bottom">Bottom</Radio>
        <Radio value="left">Left</Radio>
        <Radio value="right">Right</Radio>
      </Radio.Group>
      <Carousel dotPosition={position}>
        {colors.map((c, i) => (
          <div key={i}>
            <div style={{ ...slideStyle, background: c }}>{i + 1}</div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};
