import React from 'react';
import { Waterfall } from '../../src';
import type { WaterfallItem } from '../../src';

const items: WaterfallItem[] = Array.from({ length: 9 }, (_, i) => ({
  key: `item-${i}`,
  height: 80 + (i % 3) * 50,
  title: `Item ${i + 1}`,
}));

export default () => (
  <div>
    <h4 style={{ marginBottom: 8 }}>水平间距 24px，垂直间距 8px</h4>
    <Waterfall
      columns={3}
      gutter={[24, 8]}
      items={items}
      renderItem={(item) => (
        <div
          style={{
            height: item.height,
            background: '#f0f5ff',
            border: '1px solid #adc6ff',
            borderRadius: 6,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#1677ff',
            fontWeight: 500,
          }}
        >
          {item.title}
        </div>
      )}
    />
  </div>
);
