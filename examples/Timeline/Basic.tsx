import React from 'react';
import { Timeline } from '../../src';

/** 基础用法 */
const BasicExample = () => (
  <Timeline
    items={[
      { children: '创建项目 2024-01-01' },
      { children: '完成需求评审 2024-01-15' },
      { children: '提交测试 2024-02-01' },
      { children: '正式上线 2024-03-01' },
    ]}
  />
);

export default BasicExample;
