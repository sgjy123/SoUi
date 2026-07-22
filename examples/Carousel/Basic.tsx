import React from 'react';
import { Carousel } from '../../src';

const slideStyle: React.CSSProperties = {
  height: 160,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#fff',
  fontSize: 20,
};

const colors = ['#1677ff', '#52c41a', '#faad14', '#ff4d4f'];

export default () => (
  <Carousel autoplay>
    {colors.map((c, i) => (
      <div key={i}>
        <div style={{ ...slideStyle, background: c }}>{i + 1}</div>
      </div>
    ))}
  </Carousel>
);
