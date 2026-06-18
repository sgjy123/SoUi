import React from 'react';
import { Skeleton } from '../../src';

export default () => (
  <div>
    <h4 style={{ marginBottom: 16 }}>带头像的占位</h4>
    <Skeleton avatar />

    <h4 style={{ marginTop: 24, marginBottom: 16 }}>带头像 + 动画</h4>
    <Skeleton avatar active />

    <h4 style={{ marginTop: 24, marginBottom: 16 }}>方形头像</h4>
    <Skeleton avatar={{ shape: 'square', size: 'large' }} active />

    <h4 style={{ marginTop: 24, marginBottom: 16 }}>自定义标题宽度</h4>
    <Skeleton avatar title={{ width: '50%' }} paragraph={{ rows: 4, width: ['100%', '80%', '60%', '40%'] }} active />
  </div>
);
