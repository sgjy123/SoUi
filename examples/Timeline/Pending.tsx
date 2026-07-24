import React from 'react';
import { Timeline } from '../../src';

/** pending 加载中状态 */
const PendingExample = () => (
  <Timeline
    pending="正在处理中..."
    items={[
      { children: '订单已创建' },
      { children: '支付成功' },
      { children: '商家已接单' },
    ]}
  />
);

export default PendingExample;
