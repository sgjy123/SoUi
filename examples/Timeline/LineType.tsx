import React from 'react';
import { Timeline } from '../../src';

/** 连接线类型 */
const LineTypeExample = () => (
  <div style={{ display: 'flex', gap: 48 }}>
    <div>
      <p style={{ marginBottom: 12, color: '#666' }}>dashed 虚线</p>
      <Timeline
        lineType="dashed"
        items={[
          { children: '创建项目 2024-01-01' },
          { children: '完成需求评审 2024-01-15' },
          { children: '提交测试 2024-02-01' },
        ]}
      />
    </div>
    <div>
      <p style={{ marginBottom: 12, color: '#666' }}>dotted 点线</p>
      <Timeline
        lineType="dotted"
        items={[
          { children: '创建项目 2024-01-01' },
          { children: '完成需求评审 2024-01-15' },
          { children: '提交测试 2024-02-01' },
        ]}
      />
    </div>
    <div>
      <p style={{ marginBottom: 12, color: '#666' }}>混合使用</p>
      <Timeline
        items={[
          { children: '创建项目 2024-01-01' },
          { lineType: 'dashed', children: '需求变更 2024-01-20' },
          { lineType: 'dotted', children: '提交测试 2024-02-01' },
          { children: '正式上线 2024-03-01' },
        ]}
      />
    </div>
  </div>
);

export default LineTypeExample;
