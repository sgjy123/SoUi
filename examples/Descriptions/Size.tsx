import React, { useState } from 'react';
import { Descriptions, Radio } from '../../src';
import type { DescriptionsSize } from '../../src';

export default () => {
  const [size, setSize] = useState<DescriptionsSize>('default');
  return (
    <div>
      <Radio.Group value={size} onChange={(e) => setSize(e.target.value)} style={{ marginBottom: 16 }}>
        <Radio value="default">Default</Radio>
        <Radio value="middle">Middle</Radio>
        <Radio value="small">Small</Radio>
      </Radio.Group>
      <Descriptions title="订单详情" bordered size={size} column={2}>
        <Descriptions.Item label="订单号">SOUI-20260722</Descriptions.Item>
        <Descriptions.Item label="金额">￥ 1,299.00</Descriptions.Item>
        <Descriptions.Item label="备注" span={2}>无</Descriptions.Item>
      </Descriptions>
    </div>
  );
};
