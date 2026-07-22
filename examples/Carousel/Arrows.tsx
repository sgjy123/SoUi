import React from 'react';
import { Carousel } from '../../src';

const slideStyle: React.CSSProperties = {
  height: 200,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#fff',
  fontSize: 24,
};

const colors = ['#2f54eb', '#fa8c16', '#a0d911'];

export default () => (
  <Carousel arrows infinite={false}>
    {colors.map((c, i) => (
      <div key={i}>
        <div style={{ ...slideStyle, background: c }}>{i + 1}</div>
      </div>
    ))}
  </Carousel>
);
