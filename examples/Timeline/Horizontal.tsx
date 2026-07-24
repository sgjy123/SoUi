import React from 'react';
import { Timeline } from '../../src';

/** 横向时间轴 */
const HorizontalExample = () => (
  <Timeline
    direction="horizontal"
    items={[
      { children: '创建项目 2024-01-01' },
      { color: 'green', children: '完成需求评审 2024-01-15' },
      { color: 'green', children: '提交测试 2024-02-01' },
      { children: '正式上线 2024-03-01' },
    ]}
  />
);

export default HorizontalExample;
