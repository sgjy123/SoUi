import React from 'react';
import { Waterfall } from '../../src';
import type { WaterfallItem } from '../../src';

const colors = ['#1677ff', '#52c41a', '#faad14', '#ff4d4f', '#722ed1', '#13c2c2', '#eb2f96', '#fa8c16'];

const items: WaterfallItem[] = Array.from({ length: 12 }, (_, i) => ({
  key: `item-${i}`,
  height: 80 + Math.floor(Math.random() * 120),
  color: colors[i % colors.length],
  title: `卡片 ${i + 1}`,
}));

export default () => (
  <Waterfall
    columns={3}
    gutter={16}
    items={items}
    renderItem={(item) => (
      <div
        style={{
          height: item.height,
          background: item.color,
          borderRadius: 8,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontSize: 16,
          fontWeight: 600,
        }}
      >
        {item.title}
      </div>
    )}
  />
);
