import React from 'react';
import { Waterfall } from '../../src';
import type { WaterfallItem } from '../../src';

const colors = ['#1677ff', '#52c41a', '#faad14', '#ff4d4f', '#722ed1', '#13c2c2', '#eb2f96', '#fa8c16', '#2f54eb', '#a0d911'];

const items: WaterfallItem[] = Array.from({ length: 16 }, (_, i) => ({
  key: `item-${i}`,
  height: 60 + Math.floor(Math.random() * 140),
  color: colors[i % colors.length],
  title: `${i + 1}`,
}));

export default () => (
  <div>
    <p style={{ marginBottom: 12, color: 'rgba(0,0,0,0.45)', fontSize: 13 }}>
      缩放浏览器窗口查看响应式列数变化：xs=1, sm=2, md=3, lg=4, xl=5
    </p>
    <Waterfall
      columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
      gutter={12}
      items={items}
      renderItem={(item) => (
        <div
          style={{
            height: item.height,
            background: item.color,
            borderRadius: 6,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontSize: 20,
            fontWeight: 700,
          }}
        >
          {item.title}
        </div>
      )}
    />
  </div>
);
