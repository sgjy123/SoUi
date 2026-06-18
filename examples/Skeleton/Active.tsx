import React from 'react';
import { Skeleton } from '../../src';

export default () => (
  <div>
    <h4 style={{ marginBottom: 16 }}>带动画效果</h4>
    <Skeleton active />

    <h4 style={{ marginTop: 24, marginBottom: 16 }}>带动画 + 圆角</h4>
    <Skeleton active round />
  </div>
);
