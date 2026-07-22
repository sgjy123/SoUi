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

const colors = ['#722ed1', '#13c2c2', '#eb2f96'];

export default () => (
  <Carousel effect="fade" autoplay>
    {colors.map((c, i) => (
      <div key={i}>
        <div style={{ ...slideStyle, background: c }}>Fade {i + 1}</div>
      </div>
    ))}
  </Carousel>
);
