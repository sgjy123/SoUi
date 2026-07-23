import React from 'react';
import { PopCard, Button, Space } from '../../src';
import type { PopCardPlacement } from '../../src';

const content = <div style={{ margin: 0 }}>气泡卡片内容。</div>;
const placements: PopCardPlacement[] = ['topLeft', 'top', 'topRight', 'bottomLeft', 'bottom', 'bottomRight'];

export default () => (
  <Space size={12} wrap>
    {placements.map((p) => (
      <PopCard key={p} title={p} content={content} placement={p}>
        <Button>{p}</Button>
      </PopCard>
    ))}
  </Space>
);
