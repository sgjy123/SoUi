import React from 'react';
import { Carousel, ConfigProvider } from '../../src';

const slideStyle: React.CSSProperties = {
  height: 160,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#fff',
  fontSize: 20,
};

const colors = ['#1677ff', '#52c41a', '#faad14'];

export default () => (
  <ConfigProvider
    theme={{
      components: {
        Carousel: {
          colorPrimary: '#722ed1',
          dotSize: 6,
          arrowSize: 40,
        },
      },
    }}
  >
    <Carousel arrows autoplay>
      {colors.map((c, i) => (
        <div key={i}>
          <div style={{ ...slideStyle, background: c }}>{i + 1}</div>
        </div>
      ))}
    </Carousel>
  </ConfigProvider>
);
