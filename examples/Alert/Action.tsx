import React from 'react';
import { Alert, Space } from '../../src';

export default () => (
  <Space direction="vertical" size={12} style={{ width: '100%' }}>
    <Alert message="操作成功" type="success" action={<button style={{ padding: '2px 8px', fontSize: 12 }}>查看详情</button>} />
    <Alert
      message="系统通知"
      description="系统将于今晚 22:00 进行维护，预计持续 2 小时。"
      type="warning"
      action={<button style={{ padding: '4px 12px' }}>知道了</button>}
      showIcon
    />
  </Space>
);
