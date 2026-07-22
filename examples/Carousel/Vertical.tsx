import React from 'react';
import { Carousel } from '../../src';

const slideStyle: React.CSSProperties = {
  height: 120,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#fff',
  fontSize: 20,
};

const colors = ['#1677ff', '#52c41a', '#faad14', '#ff4d4f'];

export default () => (
  <Carousel vertical autoplay style={{ width: 300 }}>
    {colors.map((c, i) => (
      <div key={i}>
        <div style={{ ...slideStyle, background: c }}>{i + 1}</div>
      </div>
    ))}
  </Carousel>
);
