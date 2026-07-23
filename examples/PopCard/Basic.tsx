import React from 'react';
import { PopCard, Button } from '../../src';

const content = (
  <div>
    <p style={{ margin: 0 }}>气泡卡片的内容区域。</p>
    <p style={{ margin: 0 }}>可以放置任意 React 节点。</p>
  </div>
);

export default () => (
  <PopCard title="卡片标题" content={content}>
    <Button type="primary">悬停弹出</Button>
  </PopCard>
);
