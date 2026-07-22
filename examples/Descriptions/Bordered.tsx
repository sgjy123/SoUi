import React from 'react';
import { Descriptions, Badge } from '../../src';

export default () => (
  <Descriptions title="订单信息" bordered column={2}>
    <Descriptions.Item label="订单号">SOUI-20260722</Descriptions.Item>
    <Descriptions.Item label="状态">
      <Badge status="processing" text="处理中" />
    </Descriptions.Item>
    <Descriptions.Item label="下单时间">2026-07-22 10:00:00</Descriptions.Item>
    <Descriptions.Item label="金额">￥ 1,299.00</Descriptions.Item>
    <Descriptions.Item label="收货地址" span={2}>
      浙江省杭州市西湖区文三路 100 号
    </Descriptions.Item>
  </Descriptions>
);
