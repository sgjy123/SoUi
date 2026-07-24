import React from 'react';
import { Timeline } from '../../src';

/** 圆圈颜色 */
const ColorExample = () => (
  <Timeline
    items={[
      { color: 'green', children: '发布成功' },
      { color: 'blue', children: '部署中' },
      { color: 'red', children: '构建失败' },
      { color: 'gray', children: '已取消' },
      { color: '#722ed1', children: '自定义紫色节点' },
    ]}
  />
);

export default ColorExample;
