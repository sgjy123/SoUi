import React from 'react';
import { Result, Button } from '../../src';

export default () => (
  <Result
    status="success"
    title="操作成功"
    subTitle="您的订单已成功提交，我们将尽快为您处理。"
    extra={[
      <Button key="back" type="primary">返回</Button>,
      <Button key="buy">查看详情</Button>,
    ]}
  />
);
