import React from 'react';
import { Timeline } from '../../src';

/** 交替显示（带标签） */
const AlternateExample = () => (
  <Timeline
    mode="alternate"
    items={[
      {
        label: '2024-01-01',
        children: '项目立项',
        color: 'green',
      },
      {
        label: '2024-01-15',
        children: '需求评审通过',
      },
      {
        label: '2024-02-01',
        children: '提交测试',
        color: 'blue',
      },
      {
        label: '2024-02-15',
        children: '修复严重 Bug',
        color: 'red',
      },
      {
        label: '2024-03-01',
        children: '正式上线 v1.0.0',
        color: 'green',
      },
    ]}
  />
);

export default AlternateExample;
