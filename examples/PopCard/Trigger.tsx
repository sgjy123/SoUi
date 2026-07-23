import React from 'react';
import { PopCard, Button, Space } from '../../src';

const content = <div style={{ margin: 0 }}>这里是气泡卡片内容。</div>;

export default () => (
  <Space size={16}>
    <PopCard title="Hover" content={content} trigger="hover">
      <Button>悬停</Button>
    </PopCard>
    <PopCard title="Click" content={content} trigger="click">
      <Button>点击</Button>
    </PopCard>
    <PopCard title="Focus" content={content} trigger="focus">
      <Button>聚焦</Button>
    </PopCard>
  </Space>
);
